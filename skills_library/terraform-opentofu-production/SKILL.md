---
name: terraform-opentofu-production
description: Production Infrastructure-as-Code (IaC) engineering with Terraform 1.10+ and OpenTofu 1.9+, including modular layout, native S3 state locking, moved/import/removed refactoring blocks, check assertions, and tflint/trivy/checkov CI gates.
domain: devops
---

# Production Terraform & OpenTofu Infrastructure-as-Code Engineering

## 1. When to Use This Skill
Use this skill when designing, refactoring, or auditing **Terraform (`>= 1.10`)** and **OpenTofu (`>= 1.9`)** infrastructure repositories across AWS, GCP, Azure, or Cloudflare, including:
- Structuring **reusable `modules/` vs. environment root configurations (`environments/{dev,staging,prod}`)**.
- Refactoring live production state safely without resource destruction using declarative **`moved`**, **`import`**, and **`removed`** blocks.
- Writing strongly-typed `variable` `validation` rules, `check` health assertions, `ephemeral` secrets, and OpenTofu native state encryption.
- Enforcing automated CI/CD security & quality gates (`terraform fmt`, `validate`, `test`, `tflint`, `trivy config`, `checkov`).

---

## 2. Core Architecture Principles
1. **Small Blast Radius (Per-Environment & Per-Layer State Files)**:
   - Never put Networking, Databases, Kubernetes Clusters, and Stateless App Services into a single monolithic state file. Split state by **environment (`dev`, `staging`, `prod`)** and **lifecycle layer (`01-network`, `02-data`, `03-compute`)**.
2. **Prefer `for_each` Map Keys Over `count` Index Lists**:
   - Using `count` on a list causes Terraform/OpenTofu to recreate every subsequent resource when an element is removed from the middle of the list. Always use `for_each = toset(...)` or a stable map keyed by resource identifier.
3. **Zero-Downtime State Refactoring via `moved` & `import` Blocks**:
   - Never run manual `terraform state mv` commands against production state. Commit declarative `moved { from = ... to = ... }` and `import { to = ... id = ... }` blocks so state migrations are peer-reviewed in pull requests.
4. **Keyless OIDC CI/CD Authentication & Encrypted Locked State**:
   - Authenticate GitHub Actions / GitLab CI via short-lived OIDC Workload Identity Federation (`aws-actions/configure-aws-credentials`, `google-github-actions/auth`) — never store long-lived cloud keys in CI secrets. Enable native S3 lockfiles (`use_lockfile = true`) or GCS locking.

---

## 3. HCL Pattern (Backend Locking, Validated Variables, `for_each`, `moved`, & `check`)

```hcl
# versions.tf
terraform {
  required_version = ">= 1.10.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }

  backend "s3" {
    bucket       = "boomopen-prod-tfstate"
    key          = "prod/02-data/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true # Native S3 state locking (.tflock)
  }
}

# variables.tf
variable "environment" {
  description = "Deployment environment identifier"
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be one of: dev, staging, prod."
  }
}

variable "service_queues" {
  description = "Map of SQS queues keyed by logical queue name"
  type = map(object({
    visibility_timeout_seconds = optional(number, 60)
    message_retention_seconds  = optional(number, 345600)
    kms_master_key_id          = string
  }))

  validation {
    condition = alltrue([
      for k, v in var.service_queues :
      v.visibility_timeout_seconds >= 30 && v.visibility_timeout_seconds <= 900
    ])
    error_message = "Every queue visibility_timeout_seconds must be between 30 and 900 seconds."
  }
}

# main.tf
locals {
  common_tags = {
    Environment = var.environment
    ManagedBy   = "opentofu"
  }
}

resource "aws_sqs_queue" "this" {
  for_each = var.service_queues

  name                       = "boomopen-${var.environment}-${each.key}"
  visibility_timeout_seconds = each.value.visibility_timeout_seconds
  message_retention_seconds  = each.value.message_retention_seconds
  kms_master_key_id          = each.value.kms_master_key_id

  tags = merge(local.common_tags, {
    QueueKey = each.key
  })

  lifecycle {
    prevent_destroy = true
    precondition {
      condition     = length(each.value.kms_master_key_id) > 0
      error_message = "SQS queues in production must specify a non-empty KMS key ID."
    }
  }
}

# Declarative state refactoring (no manual `state mv` CLI required)
moved {
  from = aws_sqs_queue.legacy_events
  to   = aws_sqs_queue.this["events"]
}

# Post-deployment continuous infrastructure assertion
check "sqs_encryption_enforced" {
  assert {
    condition     = alltrue([for q in aws_sqs_queue.this : q.kms_master_key_id != ""])
    error_message = "All provisioned SQS queues must have KMS encryption active."
  }
}
```

---

## 4. Automated CI Validation Pipeline (`fmt` + `validate` + `tflint` + `trivy`)

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Verify canonical HCL formatting
tofu fmt -check -recursive

# 2. Initialize without touching remote state and validate types/expressions
tofu init -backend=false
tofu validate

# 3. Run provider-aware static analysis & security scanning
tflint --init && tflint --recursive
trivy config --severity HIGH,CRITICAL --exit-code 1 .

# 4. Run native .tftest.hcl unit/mock tests
tofu test
```

---

## 5. Anti-Patterns to Avoid
- ❌ **Unpinned Provider Versions (`>= 5.0.0` Without Upper Bound)**: Always pin minor/major bounds (`~> 5.80`) and commit `.terraform.lock.hcl` to prevent breaking upstream upgrades.
- ❌ **Storing Plaintext Secrets in State without Encryption**: Mark sensitive inputs/outputs with `sensitive = true`, use `ephemeral` resources for short-lived tokens, and encrypt remote state buckets with KMS.
- ❌ **Running `terraform apply -auto-approve` Without a Saved Plan File**: Always run `tofu plan -out=tfplan.binary` on PR review and apply the exact approved `tfplan.binary` artifact.

---

## 6. Verification Checklist
- [ ] `required_version` and all `required_providers` use explicit version constraints (`~>`) and `.terraform.lock.hcl` is committed.
- [ ] Remote backend enables encryption (`encrypt = true`) and state locking (`use_lockfile = true`).
- [ ] Multi-instance resources use `for_each` with stable map keys instead of positional `count`.
- [ ] All `variable` blocks include `type`, `description`, and `validation` blocks.
