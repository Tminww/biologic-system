---
icon: lucide/scale
tags:
  - ADR
  - Data model
---

# ADR-0002: UUID v7 и soft delete

- Status: Accepted
- Date: 2026-02-16

## Context

В legacy-модели есть смешение `int` и `uuid`, а также риск потери данных при физическом удалении.

## Decision

1. Использовать `UUID v7` для всех PK/FK.
2. Использовать soft delete через `deleted_at`.
3. Во всех базовых select применять `WHERE deleted_at IS NULL`.
4. Использовать частичные индексы для активных записей.

## Consequences

Плюсы:

- Единая модель идентификаторов.
- Сохранение истории и безопасное удаление.

Минусы:

- Рост таблиц и индексов со временем.
- Необходимость системной фильтрации `deleted_at`.
