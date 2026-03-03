---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `tests`

## Контекст

- ORM-сущность: `Test`
- Базовый ресурс API: `/api/v1/tests`

## CRUD операции

1. `POST /api/v1/tests`
2. `GET /api/v1/tests/{id}`
3. `GET /api/v1/tests`
4. `PATCH /api/v1/tests/{id}`
5. `DELETE /api/v1/tests/{id}`

## Поля DTO

- Связь с исследованием: `research_id` (вместо `result_id`).
- Include по связи: `research` (вместо `result`).
- Остальные поля: `value`, `comment`, `norm`, `is_active`, `indicator_id`, `status_id`, `created_at`, `updated_at`.

## Include contract

Доступные include:

- `research`
- `indicator`
- `status`
