---
name: testing-standards
description: Define and enforce test coverage, quality gates, and test architecture for FastAPI services, repositories, and endpoints. Use when adding new features, changing behavior, or reviewing whether tests and coverage are sufficient.
---

# Testing Standards

Keep test design aligned with project quality gates.

## Workflow

1. Identify changed behavior and list required test scopes.
2. Write tests first for service and API contracts where feasible.
3. Add integration coverage for repository queries and soft delete rules.
4. Validate error contract responses (`RFC 9457`).
5. Run full quality checks and coverage gate.

## Required Gates

1. `ruff check .`
2. `black --check .`
3. `mypy --strict app`
4. `pytest --cov=app`
5. Coverage target: `90-100%` of production code

## Required Test Cases

1. Full CRUD behavior for touched entities
2. Pagination metadata and limit boundaries
3. Date interval filtering
4. Single-column sorting validation
5. Soft delete behavior and query exclusion

## Reference

Always load `references/test-checklist.md` before planning or reviewing tests.
