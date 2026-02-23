---
icon: lucide/scale
tags:
  - ADR
  - API
---

# ADR-0005: Унифицированные DTO-контракты CRUD

- Status: Accepted
- Date: 2026-02-18

## Context

Контракты DTO по сущностям описывались неравномерно, и read/list ответы были неоднородными между ресурсами.
Требуется единый формат `create/read/list_read/update/delete` для всех сущностей и общая схема metadata.

## Decision

1. Ввести DTO-контракты для каждой ORM-сущности:
   - `CreateDTO`
   - `ReadDTO`
   - `ListReadDTO`
   - `UpdateDTO`
   - `DeleteDTO`
2. Ввести универсальные envelope-ответы:
   - `ReadResponseDTO[T]`
   - `ListResponseDTO[T]`
   - `ActionResponseDTO[T]`
   - `DeleteResponseDTO`
3. Ввести универсальные meta-модели:
   - `ReadMetaDTO`
   - `ListMetaDTO`
   - `ActionMetaDTO`
   - `DeleteMetaDTO`
4. Для read DTO поддержать раскрытие ссылок `*_id` через `EntityRefDTO` (`id`, `name`, `code`).
5. Разместить слой контрактов в `app/schemas`.
6. Для `read/list` meta публиковать discoverability поля include:
   - `includes_requested`
   - `includes_applied`
   - `includes_allowed` (whitelist для текущей сущности)

## Consequences

Плюсы:

- Единая структура DTO на все CRUD-ресурсы.
- Предсказуемый формат `meta` для клиентов и observability.
- Явная discoverability по include без обращения к коду сервиса.
- Готовность к расширению read DTO без ломки базового контракта.

Минусы:

- Существенный объём шаблонных DTO-классов.
- Необходимость синхронно поддерживать DTO и ORM-слой при изменении схемы БД.
