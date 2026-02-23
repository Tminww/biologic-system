---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `research_goals`

## Контекст

- ORM-сущность: `ResearchGoal`
- Базовый ресурс API: `/api/v1/research_goals`

## CRUD операции

1. `POST /api/v1/research_goals`
2. `GET /api/v1/research_goals/{id}`
3. `GET /api/v1/research_goals`
4. `PATCH /api/v1/research_goals/{id}`
5. `DELETE /api/v1/research_goals/{id}`

## Create DTO

Модель: `ResearchGoalCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `comment` | `str | None` | `no` |
| `lab_id` | `UUID | None` | `no` |

## Read DTO

Модель: `ResearchGoalReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `comment` | `str | None` | `no` |
| `lab_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `lab` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `ResearchGoalListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `code` | `str` | `yes` |
| `name` | `str` | `yes` |
| `comment` | `str | None` | `no` |
| `lab_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `lab` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `ResearchGoalUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `code` | `str | None` | `no` |
| `name` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `lab_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `ResearchGoalDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `ResearchGoalReadEnvelopeDTO`
2. List: `ResearchGoalListEnvelopeDTO`
3. Create: `ResearchGoalCreateEnvelopeDTO`
4. Update: `ResearchGoalUpdateEnvelopeDTO`
5. Delete: `ResearchGoalDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `lab`

Пример запроса:

- `GET /api/v1/research_goals?include=lab`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
