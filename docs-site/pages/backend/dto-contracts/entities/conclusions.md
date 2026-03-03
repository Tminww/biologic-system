---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `conclusions`

## Контекст

- ORM-сущность: `Conclusion`
- Базовый ресурс API: `/api/v1/conclusions`

## CRUD операции

1. `POST /api/v1/conclusions`
2. `GET /api/v1/conclusions/{id}`
3. `GET /api/v1/conclusions`
4. `PATCH /api/v1/conclusions/{id}`
5. `DELETE /api/v1/conclusions/{id}`

## Поля DTO

- `code: str`
- `name: str`
- `text_singular: str`
- `text_plural: str`
- `comment: str | None`
- `created_at: datetime`
- `updated_at: datetime`

:::note
`conclusion_status_id` и include `conclusion_status` удалены.
:::
