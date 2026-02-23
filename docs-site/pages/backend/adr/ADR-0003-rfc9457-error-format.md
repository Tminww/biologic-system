---
icon: lucide/scale
tags:
  - ADR
  - API
---

# ADR-0003: Единый формат ошибок RFC 9457

- Status: Accepted
- Date: 2026-02-16

## Context

Нужен единый и предсказуемый формат ошибок для frontend и удобной диагностики.

## Decision

1. Применять `application/problem+json`.
2. Следовать структуре RFC 9457:
   - `type`
   - `title`
   - `status`
   - `detail`
   - `instance`
3. Для validation/business деталей использовать расширение `errors`.

## Consequences

Плюсы:

- Унифицированный parsing ошибок на frontend.
- Проще поддерживать и документировать поведение API.

Минусы:

- Требуется централизованная инфраструктура маппинга исключений.
