---
name: fastapi-crud-pattern
description: Implement and review uniform FastAPI CRUD modules with schema validation, service-repository split, offset-limit pagination, query-parameter filtering, single-column sorting, and soft delete. Use when creating or updating CRUD endpoints for domain entities.
---

# FastAPI CRUD Pattern

Apply one consistent pattern for all entity CRUD modules.

## Workflow

1. Define API contract and schema DTOs.
2. Implement repository methods using `AsyncSession`.
3. Implement service methods for business rules and exceptions.
4. Implement endpoint handlers and dependency providers.
5. Validate list contract (pagination, filters, sorting, soft delete).
6. Add tests for CRUD happy paths and error cases.

## Required List Contract

1. `offset` default `0`
2. `limit` default `15`
3. `max_limit` `500`
4. `meta` fields: `total`, `offset`, `limit`
5. Date interval filters: `{field}_from` and `{field}_to`
6. Sorting by one whitelisted field (`sort_by`, `sort_order`)
7. Exclude deleted rows using `deleted_at IS NULL`

## Error Handling

Use centralized exceptions mapped to `application/problem+json` (`RFC 9457`).

## Reference

Always load `references/crud-contract.md` before implementing or reviewing CRUD changes.
