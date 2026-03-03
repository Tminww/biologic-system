# Сущности БД и доменная модель

## 1. Канонические инварианты

1. PK/FK в API: `UUID`.
2. Временные поля: ISO 8601 UTC.
3. Операционные сущности используют `soft delete` (`deleted_at`).
4. DTO read/list включают `*_id`; раскрытие связей выполняется через `include=`.

## 2. Полный каталог сущностей

| Сущность | Data model | DTO contract |
| --- | --- | --- |
| branches | [data-model](./backend/data-model/entities/branches.md) | [dto](./backend/dto-contracts/entities/branches.md) |
| change_log | [data-model](./backend/data-model/entities/change_log.md) | [dto](./backend/dto-contracts/entities/change_log.md) |
| conclusion_statuses | [data-model](./backend/data-model/entities/conclusion_statuses.md) | [dto](./backend/dto-contracts/entities/conclusion_statuses.md) |
| conclusions | [data-model](./backend/data-model/entities/conclusions.md) | [dto](./backend/dto-contracts/entities/conclusions.md) |
| directions | [data-model](./backend/data-model/entities/directions.md) | [dto](./backend/dto-contracts/entities/directions.md) |
| doctors | [data-model](./backend/data-model/entities/doctors.md) | [dto](./backend/dto-contracts/entities/doctors.md) |
| indicators | [data-model](./backend/data-model/entities/indicators.md) | [dto](./backend/dto-contracts/entities/indicators.md) |
| labs | [data-model](./backend/data-model/entities/labs.md) | [dto](./backend/dto-contracts/entities/labs.md) |
| objects | [data-model](./backend/data-model/entities/objects.md) | [dto](./backend/dto-contracts/entities/objects.md) |
| protocol_types | [data-model](./backend/data-model/entities/protocol_types.md) | [dto](./backend/dto-contracts/entities/protocol_types.md) |
| protocols | [data-model](./backend/data-model/entities/protocols.md) | [dto](./backend/dto-contracts/entities/protocols.md) |
| permissions | [data-model](./backend/data-model/entities/permissions.md) | [dto](./backend/dto-contracts/entities/permissions.md) |
| research_goals | [data-model](./backend/data-model/entities/research_goals.md) | [dto](./backend/dto-contracts/entities/research_goals.md) |
| results | [data-model](./backend/data-model/entities/results.md) | [dto](./backend/dto-contracts/entities/results.md) |
| role_permissions | [data-model](./backend/data-model/entities/role_permissions.md) | [dto](./backend/dto-contracts/entities/role_permissions.md) |
| roles | [data-model](./backend/data-model/entities/roles.md) | [dto](./backend/dto-contracts/entities/roles.md) |
| sample_targets | [data-model](./backend/data-model/entities/sample_targets.md) | [dto](./backend/dto-contracts/entities/sample_targets.md) |
| sample_types | [data-model](./backend/data-model/entities/sample_types.md) | [dto](./backend/dto-contracts/entities/sample_types.md) |
| samples | [data-model](./backend/data-model/entities/samples.md) | [dto](./backend/dto-contracts/entities/samples.md) |
| statuses | [data-model](./backend/data-model/entities/statuses.md) | [dto](./backend/dto-contracts/entities/statuses.md) |
| tests | [data-model](./backend/data-model/entities/tests.md) | [dto](./backend/dto-contracts/entities/tests.md) |
| user_scopes | [data-model](./backend/data-model/entities/user_scopes.md) | [dto](./backend/dto-contracts/entities/user_scopes.md) |
| users | [data-model](./backend/data-model/entities/users.md) | [dto](./backend/dto-contracts/entities/users.md) |

## 3. Доменные блоки

- Организация и доступ: `users`, `roles`, `permissions`, `role_permissions`, `user_scopes`, `change_log`.
- Структура лаборатории: `branches`, `labs`, `objects`, `doctors`.
- Производственный поток: `directions`, `samples`, `sample_targets`, `results`, `tests`, `conclusions`, `protocols`.
- Справочники: `statuses`, `conclusion_statuses`, `sample_types`, `research_goals`, `indicators`, `protocol_types`.

## 4. Карта связей

Источник полной диаграммы:

- `docs/backend/data-model.md`

Include whitelist по сущностям:

- `docs/backend/dto-contracts/entities/index.md`
