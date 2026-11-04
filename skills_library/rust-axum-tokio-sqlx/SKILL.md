---
name: rust-axum-tokio-sqlx
description: "Production async Rust with Tokio, Axum 0.8 state/extractor routing, Tower middleware, SQLx compile-time checked Postgres queries, and thiserror/tracing error handling."
domain: languages
version: "5.5.0"
---

# Async Rust Backend Architecture (Axum 0.8 + Tokio + SQLx)

> **PURPOSE**: Engineer high-throughput, memory-safe HTTP APIs and microservices in Rust using Axum 0.8 (`/{id}` path syntax), Tokio async runtime, SQLx Postgres connection pooling with transactions, Tower middleware, and `IntoResponse` typed domain errors.

---

## 1. Core Architectural Principles

1. **Axum 0.8 Path Parameter Syntax (`/{id}`)**:
   - Axum 0.8+ uses brace path parameters (`/api/v1/orders/{order_id}`) instead of legacy `:order_id` syntax.
2. **Centralized `IntoResponse` Error Boundary**:
   - Define a unified `ApiError` enum deriving `thiserror::Error` and implementing `axum::response::IntoResponse`.
   - Log internal database/IO details via `tracing::error!` while returning sanitized JSON `{ "error": { "code": "...", "message": "..." } }` to clients.
3. **Zero `.unwrap()` & Cancellation-Safe Async**:
   - Never call `.unwrap()` or `.expect()` inside request handlers.
   - Offload CPU-intensive work (Argon2 password hashing, image encoding, large crypto) to `tokio::task::spawn_blocking` so Tokio worker threads never stall.
4. **SQLx Transactions & Bounded Connection Pools**:
   - Configure `PgPoolOptions::new().max_connections(20).acquire_timeout(Duration::from_secs(3))` and wrap multi-statement writes in `let mut tx = state.db.begin().await?; ... tx.commit().await?;`.

---

## 2. Production Code Patterns

### Pattern A — Unified `ApiError` Implementing `IntoResponse`

```rust
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ApiError {
    #[error("Invalid request: {0}")]
    BadRequest(String),
    #[error("Resource not found: {0}")]
    NotFound(String),
    #[error("Conflict: {0}")]
    Conflict(String),
    #[error(transparent)]
    Database(#[from] sqlx::Error),
}

#[derive(Serialize)]
struct ErrorEnvelope<'a> {
    code: &'a str,
    message: String,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, code, message) = match &self {
            ApiError::BadRequest(msg) => (StatusCode::BAD_REQUEST, "BAD_REQUEST", msg.clone()),
            ApiError::NotFound(msg) => (StatusCode::NOT_FOUND, "NOT_FOUND", msg.clone()),
            ApiError::Conflict(msg) => (StatusCode::CONFLICT, "CONFLICT", msg.clone()),
            ApiError::Database(db_err) => {
                tracing::error!(error = ?db_err, "Unhandled SQLx database error");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "INTERNAL_ERROR",
                    "An internal database error occurred".to_string(),
                )
            }
        };

        (status, Json(ErrorEnvelope { code, message })).into_response()
    }
}
```

### Pattern B — Axum 0.8 Router, Shared `AppState`, Transactional SQLx Handler & Graceful Shutdown

```rust
use axum::{
    extract::{Path, State},
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};
use std::sync::Arc;
use uuid::Uuid;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
}

#[derive(Debug, Deserialize)]
pub struct CreateInvoiceReq {
    pub customer_id: Uuid,
    pub amount_cents: i64,
}

#[derive(Debug, Serialize, FromRow)]
pub struct InvoiceRecord {
    pub id: Uuid,
    pub customer_id: Uuid,
    pub amount_cents: i64,
    pub status: String,
}

pub fn build_router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/api/v1/invoices", post(create_invoice))
        .route("/api/v1/invoices/{invoice_id}", get(get_invoice_by_id))
        .with_state(state)
}

#[tracing::instrument(skip(state))]
async fn create_invoice(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<CreateInvoiceReq>,
) -> Result<(StatusCode, Json<InvoiceRecord>), ApiError> {
    if payload.amount_cents <= 0 {
        return Err(ApiError::BadRequest("amount_cents must be positive".into()));
    }

    let mut tx = state.db.begin().await?;
    let invoice_id = Uuid::now_v7();

    let record = sqlx::query_as::<_, InvoiceRecord>(
        r#"
        INSERT INTO invoices (id, customer_id, amount_cents, status)
        VALUES ($1, $2, $3, 'ISSUED')
        RETURNING id, customer_id, amount_cents, status
        "#,
    )
    .bind(invoice_id)
    .bind(payload.customer_id)
    .bind(payload.amount_cents)
    .fetch_one(&mut *tx)
    .await?;

    tx.commit().await?;
    Ok((StatusCode::CREATED, Json(record)))
}

#[tracing::instrument(skip(state))]
async fn get_invoice_by_id(
    State(state): State<Arc<AppState>>,
    Path(invoice_id): Path<Uuid>,
) -> Result<Json<InvoiceRecord>, ApiError> {
    let record = sqlx::query_as::<_, InvoiceRecord>(
        "SELECT id, customer_id, amount_cents, status FROM invoices WHERE id = $1",
    )
    .bind(invoice_id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| ApiError::NotFound(format!("Invoice {invoice_id} not found")))?;

    Ok(Json(record))
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Blocking Tokio Worker Threads with `std::fs` or `std::thread::sleep`**: Always use `tokio::fs`, `tokio::time::sleep`, or `tokio::task::spawn_blocking`.
- **❌ Leaking Raw `sqlx::Error` Messages to HTTP Clients**: Exposes table/constraint names; always map database errors in `IntoResponse`.
- **❌ Using String Interpolation (`format!("SELECT ... WHERE id = '{id}'")`) in SQL Queries**: Always bind parameters (`$1`, `$2`) via `.bind(...)` or `sqlx::query!`.

---

## 4. Verification Checklist

- [ ] All Axum 0.8 routes use `/{param}` syntax and extract state via `State<Arc<AppState>>`.
- [ ] Every handler returns `Result<..., ApiError>` with zero `.unwrap()` calls on runtime inputs.
- [ ] Multi-step database mutations execute inside a committed SQLx transaction (`db.begin().await?`).
- [ ] `cargo clippy --all-targets -- -D warnings` passes with zero warnings.
