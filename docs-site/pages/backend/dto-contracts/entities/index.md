---
icon: lucide/list-tree
tags:
  - API
  - DTO
---

# Контракты DTO по сущностям

Ниже перечислены контракты DTO для каждой сущности БД.

- [`branches`](./branches.md)
- [`change_log`](./change_log.md)
- [`conclusion_statuses`](./conclusion_statuses.md)
- [`conclusions`](./conclusions.md)
- [`directions`](./directions.md)
- [`doctors`](./doctors.md)
- [`indicators`](./indicators.md)
- [`labs`](./labs.md)
- [`objects`](./objects.md)
- [`protocol_types`](./protocol_types.md)
- [`protocols`](./protocols.md)
- [`research_goals`](./research_goals.md)
- [`results`](./results.md)
- [`role_permissions`](./role_permissions.md)
- [`roles`](./roles.md)
- [`sample_targets`](./sample_targets.md)
- [`sample_types`](./sample_types.md)
- [`samples`](./samples.md)
- [`statuses`](./statuses.md)
- [`tests`](./tests.md)
- [`user_roles`](./user_roles.md)
- [`users`](./users.md)

## Include Whitelist (Read/List)

`include` поддерживается на:

1. `GET /api/v1/{resource}`
2. `GET /api/v1/{resource}/{id}`

Матрица допустимых `include` значений по сущностям:

| Entity | Allowed include values |
| --- | --- |
| `branches` | `-` |
| `change_log` | `branch` |
| `conclusion_statuses` | `-` |
| `conclusions` | `conclusion_status` |
| `directions` | `doctor`, `object`, `status` |
| `doctors` | `-` |
| `indicators` | `lab`, `sample_type` |
| `labs` | `branch` |
| `objects` | `branch` |
| `protocol_types` | `-` |
| `protocols` | `conclusion`, `protocol_type` |
| `research_goals` | `lab` |
| `results` | `lab`, `sample`, `status` |
| `role_permissions` | `role` |
| `roles` | `-` |
| `sample_targets` | `research_goal`, `sample`, `status` |
| `sample_types` | `-` |
| `samples` | `direction`, `protocol`, `sample_type`, `status` |
| `statuses` | `-` |
| `tests` | `indicator`, `result`, `status` |
| `user_roles` | `role`, `user` |
| `users` | `lab`, `role` |

:::note
**Как формируется whitelist**

В текущей реализации whitelist формируется по FK-полям вида `*_id`.
Поля вроде `created_by`/`updated_by` в include не входят, так как они не в формате `*_id`.
:::
