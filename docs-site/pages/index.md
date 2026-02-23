# Biologic System — единая документация backend + frontend

Дата консолидации: **23 февраля 2026**.

Этот каталог (`docs/`) теперь является полным объединённым проектом документации по двум сервисам:

- backend: `docs/backend/*`
- frontend: `docs/frontend/*`

## Канонический слой интеграции (единый)

Эти файлы фиксируют согласованные правила между сервисами и устраняют расхождения:

- [Архитектура системы](./architecture.md)
- [Сущности БД и доменная модель](./database-entities.md)
- [Канонический backend API](./backend-api.md)
- [Frontend архитектура и модульная карта](./frontend.md)
- [Канонический контракт интеграции](./integration-contract.md)
- [Журнал расхождений и их закрытие](./inconsistencies.md)

## Полная backend-документация (зеркало)

Полный набор backend-материалов перенесён в `docs/backend`:

- [Backend index](./backend/index.md)
- [Архитектура backend](./backend/architecture.md)
- [Модель данных](./backend/data-model.md)
- [API guidelines](./backend/api-guidelines.md)
- [DTO contracts](./backend/dto-contracts.md)
- [ADR index](./backend/adr/index.md)
- [Runbook](./backend/runbook.md)

Подробные сущности БД:

- `docs/backend/data-model/entities/*.md`

Подробные DTO по сущностям:

- `docs/backend/dto-contracts/entities/*.md`

## Полная frontend-документация (зеркало)

Полный набор frontend-материалов перенесён в `docs/frontend`:

- [Frontend index](./frontend/index.md)
- [Быстрый старт](./frontend/getting-started.md)
- [Архитектура frontend](./frontend/architecture/overview.md)
- [Auth и permissions](./frontend/architecture/auth-and-permissions.md)
- [Роутинг и guards](./frontend/architecture/router-and-guards.md)
- [API overview](./frontend/api/overview.md)
- [Контракты модулей](./frontend/api/modules-contracts.md)
- [Текущее состояние проекта](./frontend/project/current-state.md)

## Правило источников истины

1. Детали реализации backend описываются в `docs/backend/*`.
2. Детали реализации frontend описываются в `docs/frontend/*`.
3. Межсервисный контракт и согласованные правила фиксируются в корневых unified-файлах (`architecture.md`, `backend-api.md`, `integration-contract.md`).
4. При изменениях в одном сервисе сначала обновляется его профильная документация, затем unified-слой.
