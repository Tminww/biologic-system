---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `research`

## Контекст

- ORM-сущность: `Research`
- Базовый ресурс API: `/api/v1/research`

## CRUD операции

1. `POST /api/v1/research`
2. `GET /api/v1/research/{id}`
3. `GET /api/v1/research`
4. `PATCH /api/v1/research/{id}`
5. `DELETE /api/v1/research/{id}`

## Include contract

Доступные include:

- `sample`
- `research_goal`
- `status`
