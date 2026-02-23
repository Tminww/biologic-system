---
icon: lucide/database-zap
tags:
  - Database
  - SQL
  - Performance
---

# Каталог ORM SQL-запросов репозиториев

_Сгенерировано: 2026-02-19T13:03:10.844033+00:00_

_База: `postgresql://biologic:***@localhost:5432/biologic`_

:::note
**Назначение документа**

Это автоматически сгенерированный каталог SQL-запросов, которые формируются ORM-слоем `app/repositories`.
Каталог содержит только детализацию запросов: подзаголовок, SQL и раскрывающийся блок с пояснениями.
:::

## Детализация запросов

### `BranchRepository.get`

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = '978c0ba4-b423-4b17-8ee4-2a76728d2fa7' AND branches.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `BranchRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM branches 
WHERE branches.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `BranchRepository.list.items`

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.deleted_at IS NULL ORDER BY branches.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ChangeLogRepository.get`

```sql
SELECT change_log.id, change_log.branch_id, change_log.entity_type, change_log.entity_id, change_log.action, change_log.actor_id, change_log.actor_name, change_log.snapshot, change_log.diff, change_log.created_at 
FROM change_log 
WHERE change_log.id = '1a3422af-7f10-404c-ad90-02d958264864'
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ChangeLogRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM change_log
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ChangeLogRepository.list.items`

```sql
SELECT change_log.id, change_log.branch_id, change_log.entity_type, change_log.entity_id, change_log.action, change_log.actor_id, change_log.actor_name, change_log.snapshot, change_log.diff, change_log.created_at 
FROM change_log ORDER BY change_log.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ChangeLogRepository.resolve_include_reference(branch)`

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = '978c0ba4-b423-4b17-8ee4-2a76728d2fa7' AND branches.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `branch` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `branch` по внешнему ключу для include-обогащения ответа.
:::

### `ConclusionStatusRepository.get`

```sql
SELECT conclusion_statuses.id, conclusion_statuses.code, conclusion_statuses.name, conclusion_statuses.created_at, conclusion_statuses.updated_at, conclusion_statuses.deleted_at 
FROM conclusion_statuses 
WHERE conclusion_statuses.id = 'f85eafdc-27f0-4e26-b30a-70e8dab22cad' AND conclusion_statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ConclusionStatusRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM conclusion_statuses 
WHERE conclusion_statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ConclusionStatusRepository.list.items`

```sql
SELECT conclusion_statuses.id, conclusion_statuses.code, conclusion_statuses.name, conclusion_statuses.created_at, conclusion_statuses.updated_at, conclusion_statuses.deleted_at 
FROM conclusion_statuses 
WHERE conclusion_statuses.deleted_at IS NULL ORDER BY conclusion_statuses.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ConclusionRepository.get`

```sql
SELECT conclusions.id, conclusions.comment, conclusions.conclusion_status_id, conclusions.created_by, conclusions.updated_by, conclusions.created_at, conclusions.updated_at, conclusions.deleted_at 
FROM conclusions 
WHERE conclusions.id = '645c7fa4-b77b-4f56-be51-d2a82125eee2' AND conclusions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ConclusionRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM conclusions 
WHERE conclusions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ConclusionRepository.list.items`

```sql
SELECT conclusions.id, conclusions.comment, conclusions.conclusion_status_id, conclusions.created_by, conclusions.updated_by, conclusions.created_at, conclusions.updated_at, conclusions.deleted_at 
FROM conclusions 
WHERE conclusions.deleted_at IS NULL ORDER BY conclusions.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ConclusionRepository.resolve_include_reference(conclusion_status)`

```sql
SELECT conclusion_statuses.id, conclusion_statuses.code, conclusion_statuses.name, conclusion_statuses.created_at, conclusion_statuses.updated_at, conclusion_statuses.deleted_at 
FROM conclusion_statuses 
WHERE conclusion_statuses.id = 'f85eafdc-27f0-4e26-b30a-70e8dab22cad' AND conclusion_statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `conclusion_status` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `conclusion_status` по внешнему ключу для include-обогащения ответа.
:::

### `DirectionRepository.get`

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.id = 'bc499452-d7d1-4367-bd09-fd7bd8655623' AND directions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `DirectionRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM directions 
WHERE directions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `DirectionRepository.list.items`

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.deleted_at IS NULL ORDER BY directions.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `DirectionRepository.resolve_include_reference(doctor)`

```sql
SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.patronymic, doctors.created_by, doctors.updated_by, doctors.created_at, doctors.updated_at, doctors.deleted_at 
FROM doctors 
WHERE doctors.id = '07fa66b2-0d03-47f6-9c64-5cdaf5845c3d' AND doctors.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `doctor` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `doctor` по внешнему ключу для include-обогащения ответа.
:::

### `DirectionRepository.resolve_include_reference(object)`

```sql
SELECT objects.id, objects.branch_id, objects.code, objects.name, objects.full_name, objects.address, objects.created_by, objects.updated_by, objects.created_at, objects.updated_at, objects.deleted_at 
FROM objects 
WHERE objects.id = '74977699-c6de-4216-a926-03b07b5f812f' AND objects.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `object` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `object` по внешнему ключу для include-обогащения ответа.
:::

### `DirectionRepository.resolve_include_reference(status)`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = 'a32bf08d-b70a-475c-93d3-04a38c0b7d46' AND statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `status` по внешнему ключу для include-обогащения ответа.
:::

### `DoctorRepository.get`

```sql
SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.patronymic, doctors.created_by, doctors.updated_by, doctors.created_at, doctors.updated_at, doctors.deleted_at 
FROM doctors 
WHERE doctors.id = '07fa66b2-0d03-47f6-9c64-5cdaf5845c3d' AND doctors.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `DoctorRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM doctors 
WHERE doctors.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `DoctorRepository.list.items`

```sql
SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.patronymic, doctors.created_by, doctors.updated_by, doctors.created_at, doctors.updated_at, doctors.deleted_at 
FROM doctors 
WHERE doctors.deleted_at IS NULL ORDER BY doctors.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `IndicatorRepository.get`

```sql
SELECT indicators.id, indicators.name, indicators.unit, indicators.norm_text, indicators.norm_value, indicators.default_text, indicators.comment, indicators.lab_id, indicators.sample_type_id, indicators.created_by, indicators.updated_by, indicators.created_at, indicators.updated_at, indicators.deleted_at 
FROM indicators 
WHERE indicators.id = 'ce81bbd4-4da8-45aa-ad6d-a69d5f7fb9e9' AND indicators.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `IndicatorRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM indicators 
WHERE indicators.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `IndicatorRepository.list.items`

```sql
SELECT indicators.id, indicators.name, indicators.unit, indicators.norm_text, indicators.norm_value, indicators.default_text, indicators.comment, indicators.lab_id, indicators.sample_type_id, indicators.created_by, indicators.updated_by, indicators.created_at, indicators.updated_at, indicators.deleted_at 
FROM indicators 
WHERE indicators.deleted_at IS NULL ORDER BY indicators.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `IndicatorRepository.resolve_include_reference(lab)`

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = 'a1c8b2c3-d80b-4667-9f11-e720add3806c' AND labs.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `lab` по внешнему ключу для include-обогащения ответа.
:::

### `IndicatorRepository.resolve_include_reference(sample_type)`

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '6b0ea52b-dd44-4632-8893-cbe2e0aad29d' AND sample_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `sample_type` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `sample_type` по внешнему ключу для include-обогащения ответа.
:::

### `LabRepository.get`

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = 'a1c8b2c3-d80b-4667-9f11-e720add3806c' AND labs.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `LabRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM labs 
WHERE labs.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `LabRepository.list.items`

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.deleted_at IS NULL ORDER BY labs.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `LabRepository.resolve_include_reference(branch)`

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = '978c0ba4-b423-4b17-8ee4-2a76728d2fa7' AND branches.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `branch` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `branch` по внешнему ключу для include-обогащения ответа.
:::

### `ObjectRepository.get`

```sql
SELECT objects.id, objects.branch_id, objects.code, objects.name, objects.full_name, objects.address, objects.created_by, objects.updated_by, objects.created_at, objects.updated_at, objects.deleted_at 
FROM objects 
WHERE objects.id = '74977699-c6de-4216-a926-03b07b5f812f' AND objects.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ObjectRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM objects 
WHERE objects.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ObjectRepository.list.items`

```sql
SELECT objects.id, objects.branch_id, objects.code, objects.name, objects.full_name, objects.address, objects.created_by, objects.updated_by, objects.created_at, objects.updated_at, objects.deleted_at 
FROM objects 
WHERE objects.deleted_at IS NULL ORDER BY objects.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ObjectRepository.resolve_include_reference(branch)`

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = '978c0ba4-b423-4b17-8ee4-2a76728d2fa7' AND branches.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `branch` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `branch` по внешнему ключу для include-обогащения ответа.
:::

### `ProtocolTypeRepository.get`

```sql
SELECT protocol_types.id, protocol_types.code, protocol_types.name, protocol_types.created_at, protocol_types.updated_at, protocol_types.deleted_at 
FROM protocol_types 
WHERE protocol_types.id = 'f67f5b61-3799-4140-a5a2-8c99abf15a19' AND protocol_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ProtocolTypeRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM protocol_types 
WHERE protocol_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ProtocolTypeRepository.list.items`

```sql
SELECT protocol_types.id, protocol_types.code, protocol_types.name, protocol_types.created_at, protocol_types.updated_at, protocol_types.deleted_at 
FROM protocol_types 
WHERE protocol_types.deleted_at IS NULL ORDER BY protocol_types.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ProtocolRepository.get`

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.id = '403c61a5-9587-413f-a3b0-63d140af8cf8' AND protocols.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ProtocolRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM protocols 
WHERE protocols.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ProtocolRepository.list.items`

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.deleted_at IS NULL ORDER BY protocols.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ProtocolRepository.resolve_include_reference(conclusion)`

```sql
SELECT conclusions.id, conclusions.comment, conclusions.conclusion_status_id, conclusions.created_by, conclusions.updated_by, conclusions.created_at, conclusions.updated_at, conclusions.deleted_at 
FROM conclusions 
WHERE conclusions.id = '8449d1a7-19c5-40f3-9fb1-1f8c2aa7b2a7' AND conclusions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `conclusion` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `conclusion` по внешнему ключу для include-обогащения ответа.
:::

### `ProtocolRepository.resolve_include_reference(protocol_type)`

```sql
SELECT protocol_types.id, protocol_types.code, protocol_types.name, protocol_types.created_at, protocol_types.updated_at, protocol_types.deleted_at 
FROM protocol_types 
WHERE protocol_types.id = 'f67f5b61-3799-4140-a5a2-8c99abf15a19' AND protocol_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `protocol_type` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `protocol_type` по внешнему ключу для include-обогащения ответа.
:::

### `ResearchGoalRepository.get`

```sql
SELECT research_goals.id, research_goals.code, research_goals.name, research_goals.comment, research_goals.lab_id, research_goals.created_by, research_goals.updated_by, research_goals.created_at, research_goals.updated_at, research_goals.deleted_at 
FROM research_goals 
WHERE research_goals.id = 'dbb4fecd-3cfc-4507-afcf-e52444460f27' AND research_goals.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ResearchGoalRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM research_goals 
WHERE research_goals.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ResearchGoalRepository.list.items`

```sql
SELECT research_goals.id, research_goals.code, research_goals.name, research_goals.comment, research_goals.lab_id, research_goals.created_by, research_goals.updated_by, research_goals.created_at, research_goals.updated_at, research_goals.deleted_at 
FROM research_goals 
WHERE research_goals.deleted_at IS NULL ORDER BY research_goals.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ResearchGoalRepository.resolve_include_reference(lab)`

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = 'a1c8b2c3-d80b-4667-9f11-e720add3806c' AND labs.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `lab` по внешнему ключу для include-обогащения ответа.
:::

### `ResultRepository.get`

```sql
SELECT results.id, results.comment, results.recommendation, results.is_done, results.lab_id, results.sample_id, results.status_id, results.created_by, results.updated_by, results.received_at, results.completed_at, results.created_at, results.updated_at, results.deleted_at 
FROM results 
WHERE results.id = 'aedeec14-e200-4eee-bc38-8d88df461819' AND results.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `ResultRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM results 
WHERE results.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `ResultRepository.list.items`

```sql
SELECT results.id, results.comment, results.recommendation, results.is_done, results.lab_id, results.sample_id, results.status_id, results.created_by, results.updated_by, results.received_at, results.completed_at, results.created_at, results.updated_at, results.deleted_at 
FROM results 
WHERE results.deleted_at IS NULL ORDER BY results.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `ResultRepository.resolve_include_reference(lab)`

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = 'a1c8b2c3-d80b-4667-9f11-e720add3806c' AND labs.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `lab` по внешнему ключу для include-обогащения ответа.
:::

### `ResultRepository.resolve_include_reference(sample)`

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = '00e5f146-c901-4821-9ce1-deb3a2950dda' AND samples.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `sample` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `sample` по внешнему ключу для include-обогащения ответа.
:::

### `ResultRepository.resolve_include_reference(status)`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = 'a32bf08d-b70a-475c-93d3-04a38c0b7d46' AND statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `status` по внешнему ключу для include-обогащения ответа.
:::

### `RolePermissionRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM role_permissions 
WHERE role_permissions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `RolePermissionRepository.list.items`

```sql
SELECT role_permissions.role_id, role_permissions.resource, role_permissions.action, role_permissions.created_by, role_permissions.updated_by, role_permissions.created_at, role_permissions.updated_at, role_permissions.deleted_at 
FROM role_permissions 
WHERE role_permissions.deleted_at IS NULL ORDER BY role_permissions.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `RolePermissionRepository.resolve_include_reference(role)`

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = '4c02dab2-4c77-4896-97e2-75f9022b821f'
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `role` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `role` по внешнему ключу для include-обогащения ответа.
:::

### `RolePermissionRepository.get_by_pk`

```sql
SELECT role_permissions.role_id, role_permissions.resource, role_permissions.action, role_permissions.created_by, role_permissions.updated_by, role_permissions.created_at, role_permissions.updated_at, role_permissions.deleted_at 
FROM role_permissions 
WHERE role_permissions.role_id = '4c02dab2-4c77-4896-97e2-75f9022b821f' AND role_permissions.resource = 'branches' AND role_permissions.action = 'read' AND role_permissions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Получение разрешения по составному PK (role_id, resource, action).
- Что делает: Читает запись по составному первичному ключу.
:::

### `RoleRepository.get`

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = '4c02dab2-4c77-4896-97e2-75f9022b821f'
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `RoleRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM roles
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `RoleRepository.list.items`

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles ORDER BY roles.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `SampleRepository.get`

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = '00e5f146-c901-4821-9ce1-deb3a2950dda' AND samples.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `SampleRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM samples 
WHERE samples.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `SampleRepository.list.items`

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.deleted_at IS NULL ORDER BY samples.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `SampleRepository.resolve_include_reference(direction)`

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.id = 'bc499452-d7d1-4367-bd09-fd7bd8655623' AND directions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `direction` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `direction` по внешнему ключу для include-обогащения ответа.
:::

### `SampleRepository.resolve_include_reference(protocol)`

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.id = '3e21a22b-5907-4aa6-aa00-1122a0726bef' AND protocols.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `protocol` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `protocol` по внешнему ключу для include-обогащения ответа.
:::

### `SampleRepository.resolve_include_reference(sample_type)`

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '6b0ea52b-dd44-4632-8893-cbe2e0aad29d' AND sample_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `sample_type` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `sample_type` по внешнему ключу для include-обогащения ответа.
:::

### `SampleRepository.resolve_include_reference(status)`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = 'a32bf08d-b70a-475c-93d3-04a38c0b7d46' AND statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `status` по внешнему ключу для include-обогащения ответа.
:::

### `SampleTargetRepository.get`

```sql
SELECT sample_targets.id, sample_targets.sample_id, sample_targets.research_goal_id, sample_targets.status_id, sample_targets.created_by, sample_targets.updated_by, sample_targets.created_at, sample_targets.updated_at, sample_targets.deleted_at 
FROM sample_targets 
WHERE sample_targets.id = '57d3cd05-4ac2-40bf-b9f8-c4465f6187bf' AND sample_targets.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `SampleTargetRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM sample_targets 
WHERE sample_targets.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `SampleTargetRepository.list.items`

```sql
SELECT sample_targets.id, sample_targets.sample_id, sample_targets.research_goal_id, sample_targets.status_id, sample_targets.created_by, sample_targets.updated_by, sample_targets.created_at, sample_targets.updated_at, sample_targets.deleted_at 
FROM sample_targets 
WHERE sample_targets.deleted_at IS NULL ORDER BY sample_targets.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `SampleTargetRepository.resolve_include_reference(research_goal)`

```sql
SELECT research_goals.id, research_goals.code, research_goals.name, research_goals.comment, research_goals.lab_id, research_goals.created_by, research_goals.updated_by, research_goals.created_at, research_goals.updated_at, research_goals.deleted_at 
FROM research_goals 
WHERE research_goals.id = 'dbb4fecd-3cfc-4507-afcf-e52444460f27' AND research_goals.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `research_goal` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `research_goal` по внешнему ключу для include-обогащения ответа.
:::

### `SampleTargetRepository.resolve_include_reference(sample)`

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = '00e5f146-c901-4821-9ce1-deb3a2950dda' AND samples.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `sample` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `sample` по внешнему ключу для include-обогащения ответа.
:::

### `SampleTargetRepository.resolve_include_reference(status)`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = 'a32bf08d-b70a-475c-93d3-04a38c0b7d46' AND statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `status` по внешнему ключу для include-обогащения ответа.
:::

### `SampleTypeRepository.get`

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '6b0ea52b-dd44-4632-8893-cbe2e0aad29d' AND sample_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `SampleTypeRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM sample_types 
WHERE sample_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `SampleTypeRepository.list.items`

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.deleted_at IS NULL ORDER BY sample_types.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `SampleRepository.get`

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = '00e5f146-c901-4821-9ce1-deb3a2950dda' AND samples.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `SampleRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM samples 
WHERE samples.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `SampleRepository.list.items`

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.deleted_at IS NULL ORDER BY samples.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `SampleRepository.resolve_include_reference(direction)`

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.id = 'bc499452-d7d1-4367-bd09-fd7bd8655623' AND directions.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `direction` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `direction` по внешнему ключу для include-обогащения ответа.
:::

### `SampleRepository.resolve_include_reference(protocol)`

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.id = 'b5d315a0-063f-4f15-a57e-3d2b59a04774' AND protocols.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `protocol` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `protocol` по внешнему ключу для include-обогащения ответа.
:::

### `SampleRepository.resolve_include_reference(sample_type)`

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '6b0ea52b-dd44-4632-8893-cbe2e0aad29d' AND sample_types.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `sample_type` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `sample_type` по внешнему ключу для include-обогащения ответа.
:::

### `SampleRepository.resolve_include_reference(status)`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = 'a32bf08d-b70a-475c-93d3-04a38c0b7d46' AND statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `status` по внешнему ключу для include-обогащения ответа.
:::

### `StatusRepository.get`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = 'a32bf08d-b70a-475c-93d3-04a38c0b7d46' AND statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `StatusRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM statuses 
WHERE statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `StatusRepository.list.items`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.deleted_at IS NULL ORDER BY statuses.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `TestRepository.get`

```sql
SELECT tests.id, tests.value, tests.comment, tests.norm, tests.is_active, tests.result_id, tests.indicator_id, tests.status_id, tests.created_by, tests.updated_by, tests.created_at, tests.updated_at, tests.deleted_at 
FROM tests 
WHERE tests.id = '1fa3526f-e122-4313-a7a2-68bca869c54e' AND tests.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `TestRepository.list.total`

```sql
SELECT coalesce((SELECT entity_active_counts.active_total 
FROM entity_active_counts 
WHERE entity_active_counts.entity_name = 'tests'), 0) AS coalesce_1
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `TestRepository.list.items`

```sql
SELECT tests.id, tests.value, tests.comment, tests.norm, tests.is_active, tests.result_id, tests.indicator_id, tests.status_id, tests.created_by, tests.updated_by, tests.created_at, tests.updated_at, tests.deleted_at 
FROM tests 
WHERE tests.deleted_at IS NULL ORDER BY tests.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `TestRepository.resolve_include_reference(indicator)`

```sql
SELECT indicators.id, indicators.name, indicators.unit, indicators.norm_text, indicators.norm_value, indicators.default_text, indicators.comment, indicators.lab_id, indicators.sample_type_id, indicators.created_by, indicators.updated_by, indicators.created_at, indicators.updated_at, indicators.deleted_at 
FROM indicators 
WHERE indicators.id = 'ce81bbd4-4da8-45aa-ad6d-a69d5f7fb9e9' AND indicators.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `indicator` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `indicator` по внешнему ключу для include-обогащения ответа.
:::

### `TestRepository.resolve_include_reference(result)`

```sql
SELECT results.id, results.comment, results.recommendation, results.is_done, results.lab_id, results.sample_id, results.status_id, results.created_by, results.updated_by, results.received_at, results.completed_at, results.created_at, results.updated_at, results.deleted_at 
FROM results 
WHERE results.id = 'aedeec14-e200-4eee-bc38-8d88df461819' AND results.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `result` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `result` по внешнему ключу для include-обогащения ответа.
:::

### `TestRepository.resolve_include_reference(status)`

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = 'a32bf08d-b70a-475c-93d3-04a38c0b7d46' AND statuses.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `status` по внешнему ключу для include-обогащения ответа.
:::

### `UserRoleRepository.get`

```sql
SELECT user_roles.id, user_roles.user_id, user_roles.role_id, user_roles.created_by, user_roles.updated_by, user_roles.created_at, user_roles.updated_at, user_roles.deleted_at 
FROM user_roles 
WHERE user_roles.id = '7dd9b1f2-1335-4cc3-aabb-e5b82d4383bf' AND user_roles.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `UserRoleRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM user_roles 
WHERE user_roles.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `UserRoleRepository.list.items`

```sql
SELECT user_roles.id, user_roles.user_id, user_roles.role_id, user_roles.created_by, user_roles.updated_by, user_roles.created_at, user_roles.updated_at, user_roles.deleted_at 
FROM user_roles 
WHERE user_roles.deleted_at IS NULL ORDER BY user_roles.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `UserRoleRepository.resolve_include_reference(role)`

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = '4c02dab2-4c77-4896-97e2-75f9022b821f'
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `role` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `role` по внешнему ключу для include-обогащения ответа.
:::

### `UserRoleRepository.resolve_include_reference(user)`

```sql
SELECT users.id, users.username, users.password_hash, users.code, users.first_name, users.last_name, users.patronymic, users.is_registrar, users.is_lab_head, users.is_branch_head, users.role_id, users.lab_id, users.created_by, users.updated_by, users.created_at, users.updated_at, users.deleted_at 
FROM users 
WHERE users.id = 'e327fad2-04dd-4880-8193-b3d4895bb640' AND users.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `user` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `user` по внешнему ключу для include-обогащения ответа.
:::

### `UserRepository.get`

```sql
SELECT users.id, users.username, users.password_hash, users.code, users.first_name, users.last_name, users.patronymic, users.is_registrar, users.is_lab_head, users.is_branch_head, users.role_id, users.lab_id, users.created_by, users.updated_by, users.created_at, users.updated_at, users.deleted_at 
FROM users 
WHERE users.id = 'e327fad2-04dd-4880-8193-b3d4895bb640' AND users.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Fetch a single entity by primary key with soft-delete filter.
- Что делает: Читает одну запись по первичному ключу c учетом правил soft-delete.
:::

### `UserRepository.list.total`

```sql
SELECT count(*) AS count_1 
FROM users 
WHERE users.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Подсчет общего количества строк для pagination meta.total.
- Что делает: Считает общее количество строк для `pagination.meta.total`.
:::

### `UserRepository.list.items`

```sql
SELECT users.id, users.username, users.password_hash, users.code, users.first_name, users.last_name, users.patronymic, users.is_registrar, users.is_lab_head, users.is_branch_head, users.role_id, users.lab_id, users.created_by, users.updated_by, users.created_at, users.updated_at, users.deleted_at 
FROM users 
WHERE users.deleted_at IS NULL ORDER BY users.created_at DESC 
 LIMIT 25 OFFSET 0
```

:::note
**Детали запроса**

- Для чего нужен: Чтение страницы данных c сортировкой, offset и limit.
- Что делает: Возвращает страницу данных по `offset/limit` c сортировкой и примененными фильтрами.
:::

### `UserRepository.resolve_include_reference(lab)`

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = 'a1c8b2c3-d80b-4667-9f11-e720add3806c' AND labs.deleted_at IS NULL
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `lab` по внешнему ключу для include-обогащения ответа.
:::

### `UserRepository.resolve_include_reference(role)`

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = '4c02dab2-4c77-4896-97e2-75f9022b821f'
```

:::note
**Детали запроса**

- Для чего нужен: Загрузка include-ссылки `role` по FK для обогащения DTO.
- Что делает: Загружает связанную сущность `role` по внешнему ключу для include-обогащения ответа.
:::
