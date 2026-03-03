---
icon: lucide/database
tags:
  - Data model
  - Backend
---

# Модель данных

Эта страница содержит общее описание модели данных и карту связей.
Подробное описание каждой таблицы вынесено в отдельные файлы.

## Базовые инварианты

1. Идентификаторы сущностей: `UUID v7`.
2. Для PK используется серверный `DEFAULT uuidv7()`.
3. Для операционных сущностей используется soft delete через `deleted_at`.
4. Временные поля — `timestamptz`.

## Карта связей

```mermaid
flowchart LR
  BR[branches] --> LB[labs]
  BR --> OBJ[objects]
  LB --> RG[research_goals]
  LB --> IND[indicators]
  LB --> US[users]
  LB --> RES[results]

  RO[roles] --> US
  US --> USC[user_scopes]
  BR -. scope_id .-> USC
  LB -. scope_id .-> USC
  OBJ -. scope_id .-> USC
  RO --> RP[role_permissions]
  PM[permissions] --> RP

  ST[sample_types] --> IND
  ST --> SMP[samples]

  DOC[doctors] --> DIR[directions]
  OBJ --> DIR
  STAT[statuses] --> DIR
  STAT --> SMP
  STAT --> RES
  STAT --> TST[tests]
  STAT --> STG[sample_targets]

  DIR --> SMP
  SMP --> STG
  RG --> STG
  SMP --> RES
  RES --> TST
  IND --> TST

  CSTAT[conclusion_statuses] --> CONC[conclusions]
  CONC --> PROT[protocols]
  PT[protocol_types] --> PROT

  BR --> CL[change_log]
```

## Каталог сущностей

| Таблица | Описание |
| --- | --- |
| [`branches`](data-model/entities/branches.md) | Филиалы |
| [`change_log`](data-model/entities/change_log.md) | Журнал изменений |
| [`conclusion_statuses`](data-model/entities/conclusion_statuses.md) | Статусы заключений |
| [`conclusions`](data-model/entities/conclusions.md) | Заключения |
| [`directions`](data-model/entities/directions.md) | Направления |
| [`doctors`](data-model/entities/doctors.md) | Врачи |
| [`indicators`](data-model/entities/indicators.md) | Показатели |
| [`labs`](data-model/entities/labs.md) | Лаборатории |
| [`objects`](data-model/entities/objects.md) | Объекты |
| [`protocol_types`](data-model/entities/protocol_types.md) | Типы протоколов |
| [`protocols`](data-model/entities/protocols.md) | Протоколы |
| [`permissions`](data-model/entities/permissions.md) | Каталог разрешений |
| [`research_goals`](data-model/entities/research_goals.md) | Цели исследований |
| [`results`](data-model/entities/results.md) | Результаты |
| [`role_permissions`](data-model/entities/role_permissions.md) | Права ролей |
| [`roles`](data-model/entities/roles.md) | Роли |
| [`sample_targets`](data-model/entities/sample_targets.md) | Цели проб |
| [`sample_types`](data-model/entities/sample_types.md) | Типы проб |
| [`samples`](data-model/entities/samples.md) | Пробы |
| [`statuses`](data-model/entities/statuses.md) | Статусы |
| [`tests`](data-model/entities/tests.md) | Испытания |
| [`user_scopes`](data-model/entities/user_scopes.md) | Области доступа пользователей |
| [`users`](data-model/entities/users.md) | Пользователи |

:::note
**Правило изменений**

Любые изменения структуры сначала вносятся в документацию, затем в ORM (`app/models`) и только после этого в миграции Alembic.
:::
