---
icon: lucide/boxes
tags:
  - API
  - DTO
---

# DTO Contracts

## Цель

Зафиксировать единый контракт DTO для всех CRUD-операций по каждой сущности БД.

DTO размещены в `app/schemas/`:

1. Базовые универсальные контракты и meta: `app/schemas/base.py`
2. Контракты по сущностям (`create/read/list_read/update/delete`): `app/schemas/<entity>.py`

Полный каталог контрактов по всем сущностям:

- [`docs/dto-contracts/entities/index.md`](dto-contracts/entities/index.md)
- [`docs/dto-contracts/frontend-auth-read-schema.md`](dto-contracts/frontend-auth-read-schema.md)

## Универсальные ответы

Все read/list ответы обёрнуты в универсальные envelope с `meta`.

### Read Envelope

```json
{
  "data": {},
  "meta": {
    "timestamp": "2026-02-18T10:00:00Z",
    "request_id": "req-123",
    "version": "v1",
    "includes": ["sample_type", "status"]
  }
}
```

### List Envelope

```json
{
  "items": [],
  "meta": {
    "timestamp": "2026-02-18T10:00:00Z",
    "request_id": "req-123",
    "version": "v1",
    "total": 120,
    "offset": 0,
    "limit": 15
  }
}
```

## Раскрытие связей

Базовое правило:

1. В `read/list_read` всегда возвращается поле `*_id`.
2. Раскрытый объект связи (`<field>`) возвращается только по `include=`.

Для полей вида `*_id` read DTO поддерживает:

- `<field>_id: UUID`
- `<field>: EntityRefDTO | None` (при запросе include)

`EntityRefDTO` содержит:

1. `id`
2. `name` (опционально)
3. `code` (опционально)

Пример: `status_id` + `status: { id, name, code }`.

### Discoverability include

Клиент узнаёт доступные include из OpenAPI-контракта и матрицы DTO:

1. Каждый endpoint `GET /{resource}` и `GET /{resource}/{id}` описывает query-параметр `include`.
2. Допустимые значения include публикуются как явный whitelist (enum) в OpenAPI.
3. В документации ресурсов есть сводная матрица include:
   - `docs/content/dto-contracts/entities/index.md` (раздел `Include Whitelist (Read/List)`).

Если клиент передал неподдерживаемый include, API возвращает `422 application/problem+json` с `allowed_includes`.

Пример:

```json
{
  "type": "https://api.example.local/problems/invalid-include",
  "title": "Validation failed",
  "status": 422,
  "detail": "Unsupported include: foo",
  "instance": "/api/v1/samples",
  "allowed_includes": ["status", "sample_type", "direction"]
}
```

Рекомендуемые технические поля в `meta`:

1. `includes_requested`
2. `includes_applied`
3. `includes_allowed`

## Набор DTO на сущность

Для каждой ORM-сущности созданы классы:

1. `EntityCreateDTO`
2. `EntityReadDTO`
3. `EntityListReadDTO`
4. `EntityUpdateDTO`
5. `EntityDeleteDTO`

И envelope-контракты:

1. `EntityReadEnvelopeDTO`
2. `EntityListEnvelopeDTO`
3. `EntityCreateEnvelopeDTO`
4. `EntityUpdateEnvelopeDTO`
5. `EntityDeleteEnvelopeDTO`

## Meta для не-read DTO

Для create/update/delete также определены метаданные:

1. `ActionMetaDTO` для create/update
2. `DeleteMetaDTO` для delete (soft delete)

Это даёт единый технический контракт для трассировки (`request_id`), версионирования (`version`) и времени ответа (`timestamp`) во всех DTO-ответах.
