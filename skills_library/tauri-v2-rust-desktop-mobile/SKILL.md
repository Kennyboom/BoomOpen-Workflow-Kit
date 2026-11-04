---
name: tauri-v2-rust-desktop-mobile
description: "Tauri v2 cross-platform desktop & mobile apps, Rust #[tauri::command] IPC state management, fine-grained capabilities/*.json permissions, and streaming Channel events."
domain: mobile
version: "5.5.0"
---

# Tauri v2 (Rust Desktop & iOS/Android Mobile) Architecture

> **PURPOSE**: Build ultra-lightweight, secure cross-platform desktop (Windows, macOS, Linux) and mobile (iOS, Android) applications using Tauri v2, thread-safe Rust `State<Mutex<T>>` IPC commands, high-throughput `tauri::ipc::Channel` streaming, and least-privilege `src-tauri/capabilities/*.json` ACLs.

---

## 1. Core Architectural Principles

1. **Serializable Typed Errors Across the Rust ↔ Frontend IPC Boundary**:
   - Every fallible `#[tauri::command]` MUST return `Result<T, AppError>` where `AppError` implements `thiserror::Error` and `serde::Serialize` (serializing into a structured `{ code, message }` payload rather than panicking with `.unwrap()`).
2. **Non-Blocking Async Commands (`async fn`)**:
   - Any file I/O, SQLite query, network request, or heavy CPU job MUST run in an `async fn` `#[tauri::command]` (or `tauri::async_runtime::spawn_blocking`) so the native WebView UI thread never freezes.
3. **Least-Privilege Capabilities (`src-tauri/capabilities/*.json`)**:
   - Tauri v2 replaces v1's global `allowlist` with window-scoped Capabilities. Grant only the exact plugin permissions (`fs:allow-read-text-file` scoped to `$APPDATA/**`) required by each window.
4. **High-Throughput Streaming via `tauri::ipc::Channel<T>`**:
   - For download progress, log tailing, or local LLM token streaming, pass a `tauri::ipc::Channel<ProgressPayload>` into the command rather than emitting global window events.

---

## 2. Production Code Patterns

### Pattern A — Rust `#[tauri::command]` with Managed State, Typed Error & `ipc::Channel`

```rust
// src-tauri/src/lib.rs
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{ipc::Channel, AppHandle, Manager, State};
use thiserror::Error;

#[derive(Debug, Error, Serialize)]
#[serde(tag = "code", content = "message")]
pub enum CommandError {
    #[error("Invalid input: {0}")]
    ValidationError(String),
    #[error("Storage failure: {0}")]
    StorageError(String),
}

#[derive(Default)]
pub struct VaultState {
    pub unlocked: bool,
    pub item_count: usize,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase", tag = "event", content = "data")]
pub enum SyncProgressEvent {
    Started { total_items: usize },
    Progress { completed: usize, percent: u8 },
    Finished { elapsed_ms: u64 },
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SyncRequest {
    pub workspace_id: String,
    pub batch_size: usize,
}

#[tauri::command]
pub async fn run_workspace_sync(
    request: SyncRequest,
    state: State<'_, Mutex<VaultState>>,
    on_event: Channel<SyncProgressEvent>,
) -> Result<usize, CommandError> {
    if request.workspace_id.trim().is_empty() {
        return Err(CommandError::ValidationError("workspaceId cannot be empty".into()));
    }

    let total = request.batch_size.clamp(1, 500);
    on_event
        .send(SyncProgressEvent::Started { total_items: total })
        .map_err(|e| CommandError::StorageError(e.to_string()))?;

    for idx in 1..=total {
        let pct = ((idx * 100) / total) as u8;
        on_event
            .send(SyncProgressEvent::Progress { completed: idx, percent: pct })
            .map_err(|e| CommandError::StorageError(e.to_string()))?;
    }

    {
        let mut guard = state
            .lock()
            .map_err(|_| CommandError::StorageError("Mutex poisoned".into()))?;
        guard.unlocked = true;
        guard.item_count += total;
    }

    on_event
        .send(SyncProgressEvent::Finished { elapsed_ms: 42 })
        .map_err(|e| CommandError::StorageError(e.to_string()))?;

    Ok(total)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app: &mut tauri::App| {
            app.manage(Mutex::new(VaultState::default()));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![run_workspace_sync])
        .run(tauri::generate_context!())
        .expect("error while running Tauri v2 application");
}
```

### Pattern B — TypeScript Frontend `invoke` + `Channel` Consumer & Capability ACL

```typescript
// src/lib/tauri-sync.ts
import { Channel, invoke } from '@tauri-apps/api/core';

export type SyncProgressEvent =
  | { event: 'Started'; data: { totalItems: number } }
  | { event: 'Progress'; data: { completed: number; percent: number } }
  | { event: 'Finished'; data: { elapsedMs: number } };

export async function triggerWorkspaceSync(
  workspaceId: string,
  onProgress: (ev: SyncProgressEvent) => void
): Promise<number> {
  const onEvent = new Channel<SyncProgressEvent>();
  onEvent.onmessage = onProgress;

  return invoke<number>('run_workspace_sync', {
    request: { workspaceId, batchSize: 100 },
    onEvent,
  });
}
```

```json
// src-tauri/capabilities/default.json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Least-privilege capability for the main application window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    {
      "identifier": "fs:allow-read-text-file",
      "allow": [{ "path": "$APPDATA/**" }]
    }
  ]
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Holding a `std::sync::MutexGuard` Across an `.await` Point**: Causes compiler errors or deadlocks; lock inside a tight synchronous block `{ let mut guard = state.lock()?; ... }` or use `tokio::sync::Mutex`.
- **❌ Calling `.unwrap()` Inside `#[tauri::command]`**: Crashes the entire native desktop/mobile process; always return `Result<T, CommandError>`.
- **❌ Using Wildcard Filesystem Scopes (`$HOME/**`)**: Scope file access strictly to `$APPDATA/**` or user-selected dialog paths.

---

## 4. Verification Checklist

- [ ] `lib.rs` includes `#[cfg_attr(mobile, tauri::mobile_entry_point)]` for iOS/Android compatibility.
- [ ] All `#[tauri::command]` functions return `Result<T, E>` where `E: serde::Serialize`.
- [ ] `src-tauri/capabilities/default.json` grants least-privilege permissions scoped to explicit windows and paths.
