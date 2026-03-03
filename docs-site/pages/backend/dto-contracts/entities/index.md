---
icon: lucide/list-tree
tags:
  - API
  - DTO
---

# Контракты DTO по сущностям

- [`branches`](./branches.md)
- [`change_log`](./change_log.md)
- [`conclusions`](./conclusions.md)
- [`direction_statuses`](./direction_statuses.md)
- [`directions`](./directions.md)
- [`doctors`](./doctors.md)
- [`indicators`](./indicators.md)
- [`labs`](./labs.md)
- [`objects`](./objects.md)
- [`permissions`](./permissions.md)
- [`protocol_types`](./protocol_types.md)
- [`protocols`](./protocols.md)
- [`research`](./research.md)
- [`research_goals`](./research_goals.md)
- [`research_statuses`](./research_statuses.md)
- [`role_permissions`](./role_permissions.md)
- [`roles`](./roles.md)
- [`sample_statuses`](./sample_statuses.md)
- [`sample_types`](./sample_types.md)
- [`samples`](./samples.md)
- [`test_statuses`](./test_statuses.md)
- [`tests`](./tests.md)
- [`user_scopes`](./user_scopes.md)
- [`users`](./users.md)

## Include whitelist

| Entity | Allowed include values |
| --- | --- |
| `change_log` | `branch` |
| `conclusions` | `-` |
| `directions` | `doctor`, `object`, `status` |
| `indicators` | `research_goal`, `sample_type` |
| `labs` | `branch` |
| `objects` | `branch` |
| `protocols` | `conclusion`, `protocol_type` |
| `research` | `sample`, `research_goal`, `status` |
| `research_goals` | `lab` |
| `role_permissions` | `role`, `permission` |
| `samples` | `direction`, `protocol`, `sample_type`, `status` |
| `tests` | `indicator`, `research`, `status` |
| `user_scopes` | `user` |
| `users` | `lab`, `role` |
