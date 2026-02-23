---
icon: lucide/scale
tags:
  - ADR
  - API
---

# ADR-0004: Контракт пагинации и фильтрации

- Status: Accepted
- Date: 2026-02-16

## Context

Frontend использует серверные таблицы, которым нужен стабильный и унифицированный контракт list-endpoint.

## Decision

1. Принять `offset/limit` пагинацию:
   - `offset=0`
   - `limit=15`
   - `max_limit=500`
2. Возвращать `items` и `meta(total, offset, limit)`.
3. Фильтры передавать query-параметрами.
4. Для диапазонов дат применять `{field}_from` и `{field}_to`.
5. Разрешить сортировку только по одному полю (`sort_by`, `sort_order`).

## Consequences

Плюсы:

- Единый контракт для всех CRUD list-endpoints.
- Прозрачная интеграция с frontend-таблицами.

Минусы:

- Ограничение в одну сортировку может быть узким для сложной аналитики.
