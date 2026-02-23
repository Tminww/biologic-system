---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `sample_targets`

## Контекст

- ORM-сущность: `SampleTarget`
- Базовый ресурс API: `/api/v1/sample_targets`

## CRUD операции

1. `POST /api/v1/sample_targets`
2. `GET /api/v1/sample_targets/{id}`
3. `GET /api/v1/sample_targets`
4. `PATCH /api/v1/sample_targets/{id}`
5. `DELETE /api/v1/sample_targets/{id}`

## Create DTO

Модель: `SampleTargetCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `sample_id` | `UUID` | `yes` |
| `research_goal_id` | `UUID` | `yes` |
| `status_id` | `UUID | None` | `no` |

## Read DTO

Модель: `SampleTargetReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `sample_id` | `UUID` | `yes` |
| `research_goal_id` | `UUID` | `yes` |
| `status_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `sample` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `research_goal` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `SampleTargetListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `sample_id` | `UUID` | `yes` |
| `research_goal_id` | `UUID` | `yes` |
| `status_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `sample` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `research_goal` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `SampleTargetUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `sample_id` | `UUID | None` | `no` |
| `research_goal_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `SampleTargetDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `SampleTargetReadEnvelopeDTO`
2. List: `SampleTargetListEnvelopeDTO`
3. Create: `SampleTargetCreateEnvelopeDTO`
4. Update: `SampleTargetUpdateEnvelopeDTO`
5. Delete: `SampleTargetDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `sample`
- `research_goal`
- `status`

Пример запроса:

- `GET /api/v1/sample_targets?include=sample,research_goal`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
