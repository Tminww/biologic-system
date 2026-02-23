---
icon: lucide/file-json
tags:
  - API
  - DTO
---

# Контракт DTO: `samples`

## Контекст

- ORM-сущность: `Sample`
- Базовый ресурс API: `/api/v1/samples`

## CRUD операции

1. `POST /api/v1/samples`
2. `GET /api/v1/samples/{id}`
3. `GET /api/v1/samples`
4. `PATCH /api/v1/samples/{id}`
5. `DELETE /api/v1/samples/{id}`

## Create DTO

Модель: `SampleCreateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `month_no` | `int | None` | `no` |
| `name` | `str` | `yes` |
| `alternate_name` | `str | None` | `no` |
| `mass` | `str | None` | `no` |
| `target_description` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `section` | `str | None` | `no` |
| `delivery` | `str | None` | `no` |
| `nomenclature_code` | `str | None` | `no` |
| `batch_code` | `str | None` | `no` |
| `supplier` | `str | None` | `no` |
| `is_urgent` | `bool` | `yes` |
| `is_done` | `bool` | `yes` |
| `sample_type_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `direction_id` | `UUID | None` | `no` |
| `protocol_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |

## Read DTO

Модель: `SampleReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `month_no` | `int | None` | `no` |
| `name` | `str` | `yes` |
| `alternate_name` | `str | None` | `no` |
| `mass` | `str | None` | `no` |
| `target_description` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `section` | `str | None` | `no` |
| `delivery` | `str | None` | `no` |
| `nomenclature_code` | `str | None` | `no` |
| `batch_code` | `str | None` | `no` |
| `supplier` | `str | None` | `no` |
| `is_urgent` | `bool` | `yes` |
| `is_done` | `bool` | `yes` |
| `sample_type_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `direction_id` | `UUID | None` | `no` |
| `protocol_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `sample_type` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `direction` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `protocol` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## ListRead DTO

Модель: `SampleListReadDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `id` | `UUID` | `yes` |
| `month_no` | `int | None` | `no` |
| `name` | `str` | `yes` |
| `alternate_name` | `str | None` | `no` |
| `mass` | `str | None` | `no` |
| `target_description` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `section` | `str | None` | `no` |
| `delivery` | `str | None` | `no` |
| `nomenclature_code` | `str | None` | `no` |
| `batch_code` | `str | None` | `no` |
| `supplier` | `str | None` | `no` |
| `is_urgent` | `bool` | `yes` |
| `is_done` | `bool` | `yes` |
| `sample_type_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `direction_id` | `UUID | None` | `no` |
| `protocol_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |
| `created_at` | `datetime` | `yes` |
| `updated_at` | `datetime` | `yes` |
| `sample_type` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `status` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `direction` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |
| `protocol` | `object{id: UUID, name: str | None, code: str | None} | None` | `no` |

## Update DTO

Модель: `SampleUpdateDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `month_no` | `int | None` | `no` |
| `name` | `str | None` | `no` |
| `alternate_name` | `str | None` | `no` |
| `mass` | `str | None` | `no` |
| `target_description` | `str | None` | `no` |
| `comment` | `str | None` | `no` |
| `section` | `str | None` | `no` |
| `delivery` | `str | None` | `no` |
| `nomenclature_code` | `str | None` | `no` |
| `batch_code` | `str | None` | `no` |
| `supplier` | `str | None` | `no` |
| `is_urgent` | `bool | None` | `no` |
| `is_done` | `bool | None` | `no` |
| `sample_type_id` | `UUID | None` | `no` |
| `status_id` | `UUID | None` | `no` |
| `direction_id` | `UUID | None` | `no` |
| `protocol_id` | `UUID | None` | `no` |
| `sampled_at` | `datetime | None` | `no` |
| `received_at` | `datetime | None` | `no` |
| `completed_at` | `datetime | None` | `no` |

## Delete DTO

Модель: `SampleDeleteDTO`

| Поле | Тип | Required |
| --- | --- | --- |
| `reason` | `str | None` | `no` |
| `id` | `UUID` | `yes` |

## Envelope ответы

1. Read: `SampleReadEnvelopeDTO`
2. List: `SampleListEnvelopeDTO`
3. Create: `SampleCreateEnvelopeDTO`
4. Update: `SampleUpdateEnvelopeDTO`
5. Delete: `SampleDeleteEnvelopeDTO`

## Include contract

Доступные include:

- `sample_type`
- `status`
- `direction`
- `protocol`

Пример запроса:

- `GET /api/v1/samples?include=sample_type,status`

Если include содержит неподдерживаемое значение, API должен вернуть `422 application/problem+json` с `allowed_includes`.
