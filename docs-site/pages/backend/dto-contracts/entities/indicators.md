---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `indicators`

## Контекст

- ORM-сущность: `Indicator`
- Базовый ресурс API: `/api/v1/indicators`

## CRUD операции

1. `POST /api/v1/indicators`
2. `GET /api/v1/indicators/{id}`
3. `GET /api/v1/indicators`
4. `PATCH /api/v1/indicators/{id}`
5. `DELETE /api/v1/indicators/{id}`

## Create DTO

Модель: `IndicatorCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `name` | `str` | `yes` |
| `unit` | `str | None` | `no` |
| `norm_text` | `str | None` | `no` |
| `norm_value` | `str | None` | `no` |
| `default_text` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `research_goal_id` | `UUID | None` | `no` |
| `sample_type_id` | `UUID | None` | `no` |

## Read DTO

Модель: `IndicatorReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `name` | `str` | `yes` |
| `unit` | `str | None` | `no` |
| `norm_text` | `str | None` | `no` |
| `norm_value` | `str | None` | `no` |
| `default_text` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `research_goal_id` | `UUID | None` | `no` |
| `sample_type_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `research_goal` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `sample_type` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `IndicatorListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `name` | `str` | `yes` |
| `unit` | `str | None` | `no` |
| `norm_text` | `str | None` | `no` |
| `norm_value` | `str | None` | `no` |
| `default_text` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `research_goal_id` | `UUID | None` | `no` |
| `sample_type_id` | `UUID | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `research_goal` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `sample_type` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `IndicatorUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `name` | `str | None` | `no` |
| `unit` | `str | None` | `no` |
| `norm_text` | `str | None` | `no` |
| `norm_value` | `str | None` | `no` |
| `default_text` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `research_goal_id` | `UUID | None` | `no` |
| `sample_type_id` | `UUID | None` | `no` |

## Delete DTO

Модель: `IndicatorDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `IndicatorReadEnvelopeDTO`
2. List: `IndicatorListEnvelopeDTO`
3. Create: `IndicatorCreateEnvelopeDTO`
4. Update: `IndicatorUpdateEnvelopeDTO`
5. Delete: `IndicatorDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `research_goal`
- `sample_type`

Пример запроса:

- `GET /api/v1/indicators?include=research_goal,sample_type`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
