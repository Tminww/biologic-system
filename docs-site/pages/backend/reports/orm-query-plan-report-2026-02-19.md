---
icon: lucide/archive
tags:
  - Performance
  - Database
  - Archive
---

# Архив: ORM Query Plan Analysis Report (2026-02-19)

Источник: `artifacts/orm-query-plan-report.md`.

# ORM Query Plan Analysis Report

_Generated at: 2026-02-19T11:17:45.518377+00:00_

_Database: `postgresql://biologic:***@localhost:5432/biologic`_

## Summary

- Total queries analyzed: `103`
- Queries with issues: `6`
- High severity issues: `6`
- Medium severity issues: `10`
- Execution time warning threshold: `50.00 ms`
- Seq Scan rows warning threshold: `1000`
- Plan/actual mismatch warning threshold: `20.00`

## `src.repositories.branches_repository.BranchRepository.get`

- Repository: `src.repositories.branches_repository.BranchRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.322 ms`
- Execution Time: `0.038 ms`
- Node Types: `Seq Scan`
- Relations: `branches`

### Issues

- None

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = 'a3cbcf62-8088-4d1b-9f93-1b3c086740ad' AND branches.deleted_at IS NULL
```

## `src.repositories.branches_repository.BranchRepository.list.total`

- Repository: `src.repositories.branches_repository.BranchRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.148 ms`
- Execution Time: `0.075 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `branches`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT branches.id AS id, branches.code AS code, branches.name AS name, branches.created_at AS created_at, branches.updated_at AS updated_at, branches.deleted_at AS deleted_at 
FROM branches 
WHERE branches.deleted_at IS NULL) AS anon_1
```

## `src.repositories.branches_repository.BranchRepository.list.items`

- Repository: `src.repositories.branches_repository.BranchRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.154 ms`
- Execution Time: `0.084 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `branches`

### Issues

- None

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.deleted_at IS NULL ORDER BY branches.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.change_log_repository.ChangeLogRepository.get`

- Repository: `src.repositories.change_log_repository.ChangeLogRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.349 ms`
- Execution Time: `0.015 ms`
- Node Types: `Seq Scan`
- Relations: `change_log`

### Issues

- None

```sql
SELECT change_log.id, change_log.branch_id, change_log.entity_type, change_log.entity_id, change_log.action, change_log.actor_id, change_log.actor_name, change_log.snapshot, change_log.diff, change_log.created_at 
FROM change_log 
WHERE change_log.id = '06cdb675-8b86-4b5e-a93d-8d3801f1ea5d'
```

## `src.repositories.change_log_repository.ChangeLogRepository.list.total`

- Repository: `src.repositories.change_log_repository.ChangeLogRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.125 ms`
- Execution Time: `0.048 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `change_log`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT change_log.id AS id, change_log.branch_id AS branch_id, change_log.entity_type AS entity_type, change_log.entity_id AS entity_id, change_log.action AS action, change_log.actor_id AS actor_id, change_log.actor_name AS actor_name, change_log.snapshot AS snapshot, change_log.diff AS diff, change_log.created_at AS created_at 
FROM change_log) AS anon_1
```

## `src.repositories.change_log_repository.ChangeLogRepository.list.items`

- Repository: `src.repositories.change_log_repository.ChangeLogRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.141 ms`
- Execution Time: `0.046 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `change_log`

### Issues

- None

```sql
SELECT change_log.id, change_log.branch_id, change_log.entity_type, change_log.entity_id, change_log.action, change_log.actor_id, change_log.actor_name, change_log.snapshot, change_log.diff, change_log.created_at 
FROM change_log ORDER BY change_log.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.change_log_repository.ChangeLogRepository.resolve_include_reference.branch`

- Repository: `src.repositories.change_log_repository.ChangeLogRepository`
- Method: `resolve_include_reference(branch)`
- Purpose: Загрузка include-ссылки `branch` по FK для обогащения DTO.
- Planning Time: `0.057 ms`
- Execution Time: `0.031 ms`
- Node Types: `Seq Scan`
- Relations: `branches`

### Issues

- None

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = 'a3cbcf62-8088-4d1b-9f93-1b3c086740ad' AND branches.deleted_at IS NULL
```

## `src.repositories.conclusion_statuses_repository.ConclusionStatusRepository.get`

- Repository: `src.repositories.conclusion_statuses_repository.ConclusionStatusRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.289 ms`
- Execution Time: `0.045 ms`
- Node Types: `Seq Scan`
- Relations: `conclusion_statuses`

### Issues

- None

```sql
SELECT conclusion_statuses.id, conclusion_statuses.code, conclusion_statuses.name, conclusion_statuses.created_at, conclusion_statuses.updated_at, conclusion_statuses.deleted_at 
FROM conclusion_statuses 
WHERE conclusion_statuses.id = '0b6661a9-dd34-4406-8e6b-631839f2a26b' AND conclusion_statuses.deleted_at IS NULL
```

## `src.repositories.conclusion_statuses_repository.ConclusionStatusRepository.list.total`

- Repository: `src.repositories.conclusion_statuses_repository.ConclusionStatusRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.173 ms`
- Execution Time: `0.057 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `conclusion_statuses`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT conclusion_statuses.id AS id, conclusion_statuses.code AS code, conclusion_statuses.name AS name, conclusion_statuses.created_at AS created_at, conclusion_statuses.updated_at AS updated_at, conclusion_statuses.deleted_at AS deleted_at 
FROM conclusion_statuses 
WHERE conclusion_statuses.deleted_at IS NULL) AS anon_1
```

## `src.repositories.conclusion_statuses_repository.ConclusionStatusRepository.list.items`

- Repository: `src.repositories.conclusion_statuses_repository.ConclusionStatusRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.108 ms`
- Execution Time: `0.102 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `conclusion_statuses`

### Issues

- None

```sql
SELECT conclusion_statuses.id, conclusion_statuses.code, conclusion_statuses.name, conclusion_statuses.created_at, conclusion_statuses.updated_at, conclusion_statuses.deleted_at 
FROM conclusion_statuses 
WHERE conclusion_statuses.deleted_at IS NULL ORDER BY conclusion_statuses.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.conclusions_repository.ConclusionRepository.get`

- Repository: `src.repositories.conclusions_repository.ConclusionRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.355 ms`
- Execution Time: `0.020 ms`
- Node Types: `Seq Scan`
- Relations: `conclusions`

### Issues

- None

```sql
SELECT conclusions.id, conclusions.comment, conclusions.conclusion_status_id, conclusions.created_by, conclusions.updated_by, conclusions.created_at, conclusions.updated_at, conclusions.deleted_at 
FROM conclusions 
WHERE conclusions.id = 'd1492455-d7ce-4360-926f-9013760ee9c1' AND conclusions.deleted_at IS NULL
```

## `src.repositories.conclusions_repository.ConclusionRepository.list.total`

- Repository: `src.repositories.conclusions_repository.ConclusionRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.179 ms`
- Execution Time: `0.036 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `conclusions`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT conclusions.id AS id, conclusions.comment AS comment, conclusions.conclusion_status_id AS conclusion_status_id, conclusions.created_by AS created_by, conclusions.updated_by AS updated_by, conclusions.created_at AS created_at, conclusions.updated_at AS updated_at, conclusions.deleted_at AS deleted_at 
FROM conclusions 
WHERE conclusions.deleted_at IS NULL) AS anon_1
```

## `src.repositories.conclusions_repository.ConclusionRepository.list.items`

- Repository: `src.repositories.conclusions_repository.ConclusionRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.072 ms`
- Execution Time: `0.045 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `conclusions`

### Issues

- None

```sql
SELECT conclusions.id, conclusions.comment, conclusions.conclusion_status_id, conclusions.created_by, conclusions.updated_by, conclusions.created_at, conclusions.updated_at, conclusions.deleted_at 
FROM conclusions 
WHERE conclusions.deleted_at IS NULL ORDER BY conclusions.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.conclusions_repository.ConclusionRepository.resolve_include_reference.conclusion_status`

- Repository: `src.repositories.conclusions_repository.ConclusionRepository`
- Method: `resolve_include_reference(conclusion_status)`
- Purpose: Загрузка include-ссылки `conclusion_status` по FK для обогащения DTO.
- Planning Time: `0.060 ms`
- Execution Time: `0.032 ms`
- Node Types: `Seq Scan`
- Relations: `conclusion_statuses`

### Issues

- None

```sql
SELECT conclusion_statuses.id, conclusion_statuses.code, conclusion_statuses.name, conclusion_statuses.created_at, conclusion_statuses.updated_at, conclusion_statuses.deleted_at 
FROM conclusion_statuses 
WHERE conclusion_statuses.id = '0b6661a9-dd34-4406-8e6b-631839f2a26b' AND conclusion_statuses.deleted_at IS NULL
```

## `src.repositories.directions_repository.DirectionRepository.get`

- Repository: `src.repositories.directions_repository.DirectionRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.647 ms`
- Execution Time: `0.077 ms`
- Node Types: `Index Scan`
- Relations: `directions`

### Issues

- None

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.id = '635bc7fb-4aa7-4dca-9ef2-9c9de81ae950' AND directions.deleted_at IS NULL
```

## `src.repositories.directions_repository.DirectionRepository.list.total`

- Repository: `src.repositories.directions_repository.DirectionRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.446 ms`
- Execution Time: `13.023 ms`
- Node Types: `Aggregate, Index Only Scan`
- Relations: `directions`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT directions.id AS id, directions.year_no AS year_no, directions.base_no AS base_no, directions.is_done AS is_done, directions.is_urgent AS is_urgent, directions.doctor_id AS doctor_id, directions.object_id AS object_id, directions.status_id AS status_id, directions.created_by AS created_by, directions.updated_by AS updated_by, directions.sampled_at AS sampled_at, directions.received_at AS received_at, directions.completed_at AS completed_at, directions.created_at AS created_at, directions.updated_at AS updated_at, directions.deleted_at AS deleted_at 
FROM directions 
WHERE directions.deleted_at IS NULL) AS anon_1
```

## `src.repositories.directions_repository.DirectionRepository.list.items`

- Repository: `src.repositories.directions_repository.DirectionRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.269 ms`
- Execution Time: `158.810 ms`
- Node Types: `Gather Merge, Limit, Seq Scan, Sort`
- Relations: `directions`

### Issues

- [medium] `slow_execution_time`: Execution Time 158.81 ms >= 50.00 ms.
- [high] `large_seq_scan`: Seq Scan on `directions` with Actual Rows=50000 (threshold=1000).
- [medium] `row_estimate_mismatch`: Large row estimate mismatch: max ratio=4902.00, threshold=20.00.

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.deleted_at IS NULL ORDER BY directions.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.directions_repository.DirectionRepository.resolve_include_reference.doctor`

- Repository: `src.repositories.directions_repository.DirectionRepository`
- Method: `resolve_include_reference(doctor)`
- Purpose: Загрузка include-ссылки `doctor` по FK для обогащения DTO.
- Planning Time: `0.358 ms`
- Execution Time: `0.054 ms`
- Node Types: `Seq Scan`
- Relations: `doctors`

### Issues

- None

```sql
SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.patronymic, doctors.created_by, doctors.updated_by, doctors.created_at, doctors.updated_at, doctors.deleted_at 
FROM doctors 
WHERE doctors.id = '15070b03-1c2e-43f3-831b-d2162fcfb2e2' AND doctors.deleted_at IS NULL
```

## `src.repositories.directions_repository.DirectionRepository.resolve_include_reference.object`

- Repository: `src.repositories.directions_repository.DirectionRepository`
- Method: `resolve_include_reference(object)`
- Purpose: Загрузка include-ссылки `object` по FK для обогащения DTO.
- Planning Time: `0.349 ms`
- Execution Time: `0.039 ms`
- Node Types: `Seq Scan`
- Relations: `objects`

### Issues

- None

```sql
SELECT objects.id, objects.branch_id, objects.code, objects.name, objects.full_name, objects.address, objects.created_by, objects.updated_by, objects.created_at, objects.updated_at, objects.deleted_at 
FROM objects 
WHERE objects.id = '14a20bc8-dffb-401f-88eb-72efc3afd939' AND objects.deleted_at IS NULL
```

## `src.repositories.directions_repository.DirectionRepository.resolve_include_reference.status`

- Repository: `src.repositories.directions_repository.DirectionRepository`
- Method: `resolve_include_reference(status)`
- Purpose: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Planning Time: `0.257 ms`
- Execution Time: `0.041 ms`
- Node Types: `Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = '54cde2ec-d5f8-4dfb-9601-702a108b1391' AND statuses.deleted_at IS NULL
```

## `src.repositories.doctors_repository.DoctorRepository.get`

- Repository: `src.repositories.doctors_repository.DoctorRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.108 ms`
- Execution Time: `0.051 ms`
- Node Types: `Seq Scan`
- Relations: `doctors`

### Issues

- None

```sql
SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.patronymic, doctors.created_by, doctors.updated_by, doctors.created_at, doctors.updated_at, doctors.deleted_at 
FROM doctors 
WHERE doctors.id = '15070b03-1c2e-43f3-831b-d2162fcfb2e2' AND doctors.deleted_at IS NULL
```

## `src.repositories.doctors_repository.DoctorRepository.list.total`

- Repository: `src.repositories.doctors_repository.DoctorRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.205 ms`
- Execution Time: `0.064 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `doctors`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT doctors.id AS id, doctors.first_name AS first_name, doctors.last_name AS last_name, doctors.patronymic AS patronymic, doctors.created_by AS created_by, doctors.updated_by AS updated_by, doctors.created_at AS created_at, doctors.updated_at AS updated_at, doctors.deleted_at AS deleted_at 
FROM doctors 
WHERE doctors.deleted_at IS NULL) AS anon_1
```

## `src.repositories.doctors_repository.DoctorRepository.list.items`

- Repository: `src.repositories.doctors_repository.DoctorRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.101 ms`
- Execution Time: `0.272 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `doctors`

### Issues

- None

```sql
SELECT doctors.id, doctors.first_name, doctors.last_name, doctors.patronymic, doctors.created_by, doctors.updated_by, doctors.created_at, doctors.updated_at, doctors.deleted_at 
FROM doctors 
WHERE doctors.deleted_at IS NULL ORDER BY doctors.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.indicators_repository.IndicatorRepository.get`

- Repository: `src.repositories.indicators_repository.IndicatorRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.764 ms`
- Execution Time: `0.071 ms`
- Node Types: `Seq Scan`
- Relations: `indicators`

### Issues

- None

```sql
SELECT indicators.id, indicators.name, indicators.unit, indicators.norm_text, indicators.norm_value, indicators.default_text, indicators.comment, indicators.lab_id, indicators.sample_type_id, indicators.created_by, indicators.updated_by, indicators.created_at, indicators.updated_at, indicators.deleted_at 
FROM indicators 
WHERE indicators.id = 'e12f8f32-be03-4023-93df-552f26171422' AND indicators.deleted_at IS NULL
```

## `src.repositories.indicators_repository.IndicatorRepository.list.total`

- Repository: `src.repositories.indicators_repository.IndicatorRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.187 ms`
- Execution Time: `0.098 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `indicators`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT indicators.id AS id, indicators.name AS name, indicators.unit AS unit, indicators.norm_text AS norm_text, indicators.norm_value AS norm_value, indicators.default_text AS default_text, indicators.comment AS comment, indicators.lab_id AS lab_id, indicators.sample_type_id AS sample_type_id, indicators.created_by AS created_by, indicators.updated_by AS updated_by, indicators.created_at AS created_at, indicators.updated_at AS updated_at, indicators.deleted_at AS deleted_at 
FROM indicators 
WHERE indicators.deleted_at IS NULL) AS anon_1
```

## `src.repositories.indicators_repository.IndicatorRepository.list.items`

- Repository: `src.repositories.indicators_repository.IndicatorRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.085 ms`
- Execution Time: `0.132 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `indicators`

### Issues

- None

```sql
SELECT indicators.id, indicators.name, indicators.unit, indicators.norm_text, indicators.norm_value, indicators.default_text, indicators.comment, indicators.lab_id, indicators.sample_type_id, indicators.created_by, indicators.updated_by, indicators.created_at, indicators.updated_at, indicators.deleted_at 
FROM indicators 
WHERE indicators.deleted_at IS NULL ORDER BY indicators.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.indicators_repository.IndicatorRepository.resolve_include_reference.lab`

- Repository: `src.repositories.indicators_repository.IndicatorRepository`
- Method: `resolve_include_reference(lab)`
- Purpose: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Planning Time: `0.406 ms`
- Execution Time: `0.037 ms`
- Node Types: `Seq Scan`
- Relations: `labs`

### Issues

- None

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = '2b7fe5cd-aedb-49e3-a679-fffab477f0d3' AND labs.deleted_at IS NULL
```

## `src.repositories.indicators_repository.IndicatorRepository.resolve_include_reference.sample_type`

- Repository: `src.repositories.indicators_repository.IndicatorRepository`
- Method: `resolve_include_reference(sample_type)`
- Purpose: Загрузка include-ссылки `sample_type` по FK для обогащения DTO.
- Planning Time: `0.340 ms`
- Execution Time: `0.054 ms`
- Node Types: `Seq Scan`
- Relations: `sample_types`

### Issues

- None

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '050a934a-173d-45ca-8e72-a97bbc8432e7' AND sample_types.deleted_at IS NULL
```

## `src.repositories.labs_repository.LabRepository.get`

- Repository: `src.repositories.labs_repository.LabRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.050 ms`
- Execution Time: `0.035 ms`
- Node Types: `Seq Scan`
- Relations: `labs`

### Issues

- None

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = '2b7fe5cd-aedb-49e3-a679-fffab477f0d3' AND labs.deleted_at IS NULL
```

## `src.repositories.labs_repository.LabRepository.list.total`

- Repository: `src.repositories.labs_repository.LabRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.104 ms`
- Execution Time: `0.064 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `labs`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT labs.id AS id, labs.branch_id AS branch_id, labs.code AS code, labs.name AS name, labs.full_name AS full_name, labs.created_by AS created_by, labs.updated_by AS updated_by, labs.created_at AS created_at, labs.updated_at AS updated_at, labs.deleted_at AS deleted_at 
FROM labs 
WHERE labs.deleted_at IS NULL) AS anon_1
```

## `src.repositories.labs_repository.LabRepository.list.items`

- Repository: `src.repositories.labs_repository.LabRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.059 ms`
- Execution Time: `0.081 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `labs`

### Issues

- None

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.deleted_at IS NULL ORDER BY labs.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.labs_repository.LabRepository.resolve_include_reference.branch`

- Repository: `src.repositories.labs_repository.LabRepository`
- Method: `resolve_include_reference(branch)`
- Purpose: Загрузка include-ссылки `branch` по FK для обогащения DTO.
- Planning Time: `0.051 ms`
- Execution Time: `0.035 ms`
- Node Types: `Seq Scan`
- Relations: `branches`

### Issues

- None

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = 'a3cbcf62-8088-4d1b-9f93-1b3c086740ad' AND branches.deleted_at IS NULL
```

## `src.repositories.objects_repository.ObjectRepository.get`

- Repository: `src.repositories.objects_repository.ObjectRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.051 ms`
- Execution Time: `0.034 ms`
- Node Types: `Seq Scan`
- Relations: `objects`

### Issues

- None

```sql
SELECT objects.id, objects.branch_id, objects.code, objects.name, objects.full_name, objects.address, objects.created_by, objects.updated_by, objects.created_at, objects.updated_at, objects.deleted_at 
FROM objects 
WHERE objects.id = '14a20bc8-dffb-401f-88eb-72efc3afd939' AND objects.deleted_at IS NULL
```

## `src.repositories.objects_repository.ObjectRepository.list.total`

- Repository: `src.repositories.objects_repository.ObjectRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.184 ms`
- Execution Time: `0.076 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `objects`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT objects.id AS id, objects.branch_id AS branch_id, objects.code AS code, objects.name AS name, objects.full_name AS full_name, objects.address AS address, objects.created_by AS created_by, objects.updated_by AS updated_by, objects.created_at AS created_at, objects.updated_at AS updated_at, objects.deleted_at AS deleted_at 
FROM objects 
WHERE objects.deleted_at IS NULL) AS anon_1
```

## `src.repositories.objects_repository.ObjectRepository.list.items`

- Repository: `src.repositories.objects_repository.ObjectRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.134 ms`
- Execution Time: `0.138 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `objects`

### Issues

- None

```sql
SELECT objects.id, objects.branch_id, objects.code, objects.name, objects.full_name, objects.address, objects.created_by, objects.updated_by, objects.created_at, objects.updated_at, objects.deleted_at 
FROM objects 
WHERE objects.deleted_at IS NULL ORDER BY objects.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.objects_repository.ObjectRepository.resolve_include_reference.branch`

- Repository: `src.repositories.objects_repository.ObjectRepository`
- Method: `resolve_include_reference(branch)`
- Purpose: Загрузка include-ссылки `branch` по FK для обогащения DTO.
- Planning Time: `0.113 ms`
- Execution Time: `0.050 ms`
- Node Types: `Seq Scan`
- Relations: `branches`

### Issues

- None

```sql
SELECT branches.id, branches.code, branches.name, branches.created_at, branches.updated_at, branches.deleted_at 
FROM branches 
WHERE branches.id = 'a3cbcf62-8088-4d1b-9f93-1b3c086740ad' AND branches.deleted_at IS NULL
```

## `src.repositories.protocol_types_repository.ProtocolTypeRepository.get`

- Repository: `src.repositories.protocol_types_repository.ProtocolTypeRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.265 ms`
- Execution Time: `0.031 ms`
- Node Types: `Seq Scan`
- Relations: `protocol_types`

### Issues

- None

```sql
SELECT protocol_types.id, protocol_types.code, protocol_types.name, protocol_types.created_at, protocol_types.updated_at, protocol_types.deleted_at 
FROM protocol_types 
WHERE protocol_types.id = '37ea896c-5c6b-4542-be4d-d9bd19ea4aab' AND protocol_types.deleted_at IS NULL
```

## `src.repositories.protocol_types_repository.ProtocolTypeRepository.list.total`

- Repository: `src.repositories.protocol_types_repository.ProtocolTypeRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.135 ms`
- Execution Time: `0.059 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `protocol_types`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT protocol_types.id AS id, protocol_types.code AS code, protocol_types.name AS name, protocol_types.created_at AS created_at, protocol_types.updated_at AS updated_at, protocol_types.deleted_at AS deleted_at 
FROM protocol_types 
WHERE protocol_types.deleted_at IS NULL) AS anon_1
```

## `src.repositories.protocol_types_repository.ProtocolTypeRepository.list.items`

- Repository: `src.repositories.protocol_types_repository.ProtocolTypeRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.079 ms`
- Execution Time: `0.090 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `protocol_types`

### Issues

- None

```sql
SELECT protocol_types.id, protocol_types.code, protocol_types.name, protocol_types.created_at, protocol_types.updated_at, protocol_types.deleted_at 
FROM protocol_types 
WHERE protocol_types.deleted_at IS NULL ORDER BY protocol_types.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.protocols_repository.ProtocolRepository.get`

- Repository: `src.repositories.protocols_repository.ProtocolRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.435 ms`
- Execution Time: `0.013 ms`
- Node Types: `Seq Scan`
- Relations: `protocols`

### Issues

- None

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.id = '4939aa03-95ff-4589-82ec-a5530ab24562' AND protocols.deleted_at IS NULL
```

## `src.repositories.protocols_repository.ProtocolRepository.list.total`

- Repository: `src.repositories.protocols_repository.ProtocolRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.131 ms`
- Execution Time: `0.041 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `protocols`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT protocols.id AS id, protocols.year_no AS year_no, protocols.copies AS copies, protocols.is_signed AS is_signed, protocols.protocol_copy_name AS protocol_copy_name, protocols.excerpt_copy_name AS excerpt_copy_name, protocols.conclusion_id AS conclusion_id, protocols.protocol_type_id AS protocol_type_id, protocols.created_by AS created_by, protocols.updated_by AS updated_by, protocols.issued_at AS issued_at, protocols.created_at AS created_at, protocols.updated_at AS updated_at, protocols.deleted_at AS deleted_at 
FROM protocols 
WHERE protocols.deleted_at IS NULL) AS anon_1
```

## `src.repositories.protocols_repository.ProtocolRepository.list.items`

- Repository: `src.repositories.protocols_repository.ProtocolRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.308 ms`
- Execution Time: `0.071 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `protocols`

### Issues

- None

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.deleted_at IS NULL ORDER BY protocols.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.protocols_repository.ProtocolRepository.resolve_include_reference.conclusion`

- Repository: `src.repositories.protocols_repository.ProtocolRepository`
- Method: `resolve_include_reference(conclusion)`
- Purpose: Загрузка include-ссылки `conclusion` по FK для обогащения DTO.
- Planning Time: `0.065 ms`
- Execution Time: `0.014 ms`
- Node Types: `Seq Scan`
- Relations: `conclusions`

### Issues

- None

```sql
SELECT conclusions.id, conclusions.comment, conclusions.conclusion_status_id, conclusions.created_by, conclusions.updated_by, conclusions.created_at, conclusions.updated_at, conclusions.deleted_at 
FROM conclusions 
WHERE conclusions.id = 'fc1fbea9-29a0-424f-851f-4d41667ffdea' AND conclusions.deleted_at IS NULL
```

## `src.repositories.protocols_repository.ProtocolRepository.resolve_include_reference.protocol_type`

- Repository: `src.repositories.protocols_repository.ProtocolRepository`
- Method: `resolve_include_reference(protocol_type)`
- Purpose: Загрузка include-ссылки `protocol_type` по FK для обогащения DTO.
- Planning Time: `0.080 ms`
- Execution Time: `0.032 ms`
- Node Types: `Seq Scan`
- Relations: `protocol_types`

### Issues

- None

```sql
SELECT protocol_types.id, protocol_types.code, protocol_types.name, protocol_types.created_at, protocol_types.updated_at, protocol_types.deleted_at 
FROM protocol_types 
WHERE protocol_types.id = '37ea896c-5c6b-4542-be4d-d9bd19ea4aab' AND protocol_types.deleted_at IS NULL
```

## `src.repositories.research_goals_repository.ResearchGoalRepository.get`

- Repository: `src.repositories.research_goals_repository.ResearchGoalRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.504 ms`
- Execution Time: `0.046 ms`
- Node Types: `Seq Scan`
- Relations: `research_goals`

### Issues

- None

```sql
SELECT research_goals.id, research_goals.code, research_goals.name, research_goals.comment, research_goals.lab_id, research_goals.created_by, research_goals.updated_by, research_goals.created_at, research_goals.updated_at, research_goals.deleted_at 
FROM research_goals 
WHERE research_goals.id = 'cf6a156f-c942-4491-a2fb-635124f37a6f' AND research_goals.deleted_at IS NULL
```

## `src.repositories.research_goals_repository.ResearchGoalRepository.list.total`

- Repository: `src.repositories.research_goals_repository.ResearchGoalRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.191 ms`
- Execution Time: `0.060 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `research_goals`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT research_goals.id AS id, research_goals.code AS code, research_goals.name AS name, research_goals.comment AS comment, research_goals.lab_id AS lab_id, research_goals.created_by AS created_by, research_goals.updated_by AS updated_by, research_goals.created_at AS created_at, research_goals.updated_at AS updated_at, research_goals.deleted_at AS deleted_at 
FROM research_goals 
WHERE research_goals.deleted_at IS NULL) AS anon_1
```

## `src.repositories.research_goals_repository.ResearchGoalRepository.list.items`

- Repository: `src.repositories.research_goals_repository.ResearchGoalRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.074 ms`
- Execution Time: `0.092 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `research_goals`

### Issues

- None

```sql
SELECT research_goals.id, research_goals.code, research_goals.name, research_goals.comment, research_goals.lab_id, research_goals.created_by, research_goals.updated_by, research_goals.created_at, research_goals.updated_at, research_goals.deleted_at 
FROM research_goals 
WHERE research_goals.deleted_at IS NULL ORDER BY research_goals.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.research_goals_repository.ResearchGoalRepository.resolve_include_reference.lab`

- Repository: `src.repositories.research_goals_repository.ResearchGoalRepository`
- Method: `resolve_include_reference(lab)`
- Purpose: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Planning Time: `0.074 ms`
- Execution Time: `0.042 ms`
- Node Types: `Seq Scan`
- Relations: `labs`

### Issues

- None

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = '2b7fe5cd-aedb-49e3-a679-fffab477f0d3' AND labs.deleted_at IS NULL
```

## `src.repositories.results_repository.ResultRepository.get`

- Repository: `src.repositories.results_repository.ResultRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.728 ms`
- Execution Time: `0.083 ms`
- Node Types: `Index Scan`
- Relations: `results`

### Issues

- None

```sql
SELECT results.id, results.comment, results.recommendation, results.is_done, results.lab_id, results.sample_id, results.status_id, results.created_by, results.updated_by, results.received_at, results.completed_at, results.created_at, results.updated_at, results.deleted_at 
FROM results 
WHERE results.id = '047bdd0f-ef67-496a-b16d-7e9b797ea215' AND results.deleted_at IS NULL
```

## `src.repositories.results_repository.ResultRepository.list.total`

- Repository: `src.repositories.results_repository.ResultRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.165 ms`
- Execution Time: `13.413 ms`
- Node Types: `Aggregate, Index Only Scan`
- Relations: `results`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT results.id AS id, results.comment AS comment, results.recommendation AS recommendation, results.is_done AS is_done, results.lab_id AS lab_id, results.sample_id AS sample_id, results.status_id AS status_id, results.created_by AS created_by, results.updated_by AS updated_by, results.received_at AS received_at, results.completed_at AS completed_at, results.created_at AS created_at, results.updated_at AS updated_at, results.deleted_at AS deleted_at 
FROM results 
WHERE results.deleted_at IS NULL) AS anon_1
```

## `src.repositories.results_repository.ResultRepository.list.items`

- Repository: `src.repositories.results_repository.ResultRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.171 ms`
- Execution Time: `38.517 ms`
- Node Types: `Gather Merge, Limit, Seq Scan, Sort`
- Relations: `results`

### Issues

- [high] `large_seq_scan`: Seq Scan on `results` with Actual Rows=50000 (threshold=1000).
- [medium] `row_estimate_mismatch`: Large row estimate mismatch: max ratio=2352.96, threshold=20.00.

```sql
SELECT results.id, results.comment, results.recommendation, results.is_done, results.lab_id, results.sample_id, results.status_id, results.created_by, results.updated_by, results.received_at, results.completed_at, results.created_at, results.updated_at, results.deleted_at 
FROM results 
WHERE results.deleted_at IS NULL ORDER BY results.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.results_repository.ResultRepository.resolve_include_reference.lab`

- Repository: `src.repositories.results_repository.ResultRepository`
- Method: `resolve_include_reference(lab)`
- Purpose: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Planning Time: `0.119 ms`
- Execution Time: `0.051 ms`
- Node Types: `Seq Scan`
- Relations: `labs`

### Issues

- None

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = '2b7fe5cd-aedb-49e3-a679-fffab477f0d3' AND labs.deleted_at IS NULL
```

## `src.repositories.results_repository.ResultRepository.resolve_include_reference.sample`

- Repository: `src.repositories.results_repository.ResultRepository`
- Method: `resolve_include_reference(sample)`
- Purpose: Загрузка include-ссылки `sample` по FK для обогащения DTO.
- Planning Time: `1.448 ms`
- Execution Time: `0.087 ms`
- Node Types: `Index Scan`
- Relations: `samples`

### Issues

- None

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = 'e7cc5ead-20e5-43fe-be45-ea6758471214' AND samples.deleted_at IS NULL
```

## `src.repositories.results_repository.ResultRepository.resolve_include_reference.status`

- Repository: `src.repositories.results_repository.ResultRepository`
- Method: `resolve_include_reference(status)`
- Purpose: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Planning Time: `0.118 ms`
- Execution Time: `0.053 ms`
- Node Types: `Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = '54cde2ec-d5f8-4dfb-9601-702a108b1391' AND statuses.deleted_at IS NULL
```

## `src.repositories.role_permissions_repository.RolePermissionRepository.list.total`

- Repository: `src.repositories.role_permissions_repository.RolePermissionRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.233 ms`
- Execution Time: `0.074 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `role_permissions`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT role_permissions.role_id AS role_id, role_permissions.resource AS resource, role_permissions.action AS action, role_permissions.created_by AS created_by, role_permissions.updated_by AS updated_by, role_permissions.created_at AS created_at, role_permissions.updated_at AS updated_at, role_permissions.deleted_at AS deleted_at 
FROM role_permissions 
WHERE role_permissions.deleted_at IS NULL) AS anon_1
```

## `src.repositories.role_permissions_repository.RolePermissionRepository.list.items`

- Repository: `src.repositories.role_permissions_repository.RolePermissionRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.336 ms`
- Execution Time: `0.118 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `role_permissions`

### Issues

- None

```sql
SELECT role_permissions.role_id, role_permissions.resource, role_permissions.action, role_permissions.created_by, role_permissions.updated_by, role_permissions.created_at, role_permissions.updated_at, role_permissions.deleted_at 
FROM role_permissions 
WHERE role_permissions.deleted_at IS NULL ORDER BY role_permissions.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.role_permissions_repository.RolePermissionRepository.resolve_include_reference.role`

- Repository: `src.repositories.role_permissions_repository.RolePermissionRepository`
- Method: `resolve_include_reference(role)`
- Purpose: Загрузка include-ссылки `role` по FK для обогащения DTO.
- Planning Time: `0.253 ms`
- Execution Time: `0.025 ms`
- Node Types: `Seq Scan`
- Relations: `roles`

### Issues

- None

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = 'a46d12db-a288-40c7-a1b0-dff45296d4df'
```

## `src.repositories.role_permissions_repository.RolePermissionRepository.get_by_pk`

- Repository: `src.repositories.role_permissions_repository.RolePermissionRepository`
- Method: `get_by_pk`
- Purpose: Получение разрешения по составному PK (role_id, resource, action).
- Planning Time: `0.088 ms`
- Execution Time: `0.035 ms`
- Node Types: `Seq Scan`
- Relations: `role_permissions`

### Issues

- None

```sql
SELECT role_permissions.role_id, role_permissions.resource, role_permissions.action, role_permissions.created_by, role_permissions.updated_by, role_permissions.created_at, role_permissions.updated_at, role_permissions.deleted_at 
FROM role_permissions 
WHERE role_permissions.role_id = 'a46d12db-a288-40c7-a1b0-dff45296d4df' AND role_permissions.resource = 'branches' AND role_permissions.action = 'read' AND role_permissions.deleted_at IS NULL
```

## `src.repositories.roles_repository.RoleRepository.get`

- Repository: `src.repositories.roles_repository.RoleRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.041 ms`
- Execution Time: `0.015 ms`
- Node Types: `Seq Scan`
- Relations: `roles`

### Issues

- None

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = 'a46d12db-a288-40c7-a1b0-dff45296d4df'
```

## `src.repositories.roles_repository.RoleRepository.list.total`

- Repository: `src.repositories.roles_repository.RoleRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.158 ms`
- Execution Time: `0.035 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `roles`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT roles.id AS id, roles.key AS key, roles.name AS name, roles.created_at AS created_at, roles.updated_at AS updated_at 
FROM roles) AS anon_1
```

## `src.repositories.roles_repository.RoleRepository.list.items`

- Repository: `src.repositories.roles_repository.RoleRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.082 ms`
- Execution Time: `0.081 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `roles`

### Issues

- None

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles ORDER BY roles.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.sample_repository.SampleRepository.get`

- Repository: `src.repositories.sample_repository.SampleRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.102 ms`
- Execution Time: `0.075 ms`
- Node Types: `Index Scan`
- Relations: `samples`

### Issues

- None

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = 'e7cc5ead-20e5-43fe-be45-ea6758471214' AND samples.deleted_at IS NULL
```

## `src.repositories.sample_repository.SampleRepository.list.total`

- Repository: `src.repositories.sample_repository.SampleRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.258 ms`
- Execution Time: `12.868 ms`
- Node Types: `Aggregate, Index Only Scan`
- Relations: `samples`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT samples.id AS id, samples.month_no AS month_no, samples.name AS name, samples.alternate_name AS alternate_name, samples.mass AS mass, samples.target_description AS target_description, samples.comment AS comment, samples.section AS section, samples.delivery AS delivery, samples.nomenclature_code AS nomenclature_code, samples.batch_code AS batch_code, samples.supplier AS supplier, samples.is_urgent AS is_urgent, samples.is_done AS is_done, samples.sample_type_id AS sample_type_id, samples.status_id AS status_id, samples.direction_id AS direction_id, samples.protocol_id AS protocol_id, samples.created_by AS created_by, samples.updated_by AS updated_by, samples.sampled_at AS sampled_at, samples.received_at AS received_at, samples.completed_at AS completed_at, samples.created_at AS created_at, samples.updated_at AS updated_at, samples.deleted_at AS deleted_at 
FROM samples 
WHERE samples.deleted_at IS NULL) AS anon_1
```

## `src.repositories.sample_repository.SampleRepository.list.items`

- Repository: `src.repositories.sample_repository.SampleRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.247 ms`
- Execution Time: `76.293 ms`
- Node Types: `Gather Merge, Limit, Seq Scan, Sort`
- Relations: `samples`

### Issues

- [medium] `slow_execution_time`: Execution Time 76.29 ms >= 50.00 ms.
- [high] `large_seq_scan`: Seq Scan on `samples` with Actual Rows=33333 (threshold=1000).
- [medium] `row_estimate_mismatch`: Large row estimate mismatch: max ratio=3333.36, threshold=20.00.

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.deleted_at IS NULL ORDER BY samples.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.sample_repository.SampleRepository.resolve_include_reference.direction`

- Repository: `src.repositories.sample_repository.SampleRepository`
- Method: `resolve_include_reference(direction)`
- Purpose: Загрузка include-ссылки `direction` по FK для обогащения DTO.
- Planning Time: `0.163 ms`
- Execution Time: `0.128 ms`
- Node Types: `Index Scan`
- Relations: `directions`

### Issues

- None

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.id = '635bc7fb-4aa7-4dca-9ef2-9c9de81ae950' AND directions.deleted_at IS NULL
```

## `src.repositories.sample_repository.SampleRepository.resolve_include_reference.protocol`

- Repository: `src.repositories.sample_repository.SampleRepository`
- Method: `resolve_include_reference(protocol)`
- Purpose: Загрузка include-ссылки `protocol` по FK для обогащения DTO.
- Planning Time: `0.148 ms`
- Execution Time: `0.036 ms`
- Node Types: `Seq Scan`
- Relations: `protocols`

### Issues

- None

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.id = 'e97ab494-b729-4f46-827b-6e5dd7b1618c' AND protocols.deleted_at IS NULL
```

## `src.repositories.sample_repository.SampleRepository.resolve_include_reference.sample_type`

- Repository: `src.repositories.sample_repository.SampleRepository`
- Method: `resolve_include_reference(sample_type)`
- Purpose: Загрузка include-ссылки `sample_type` по FK для обогащения DTO.
- Planning Time: `0.081 ms`
- Execution Time: `0.041 ms`
- Node Types: `Seq Scan`
- Relations: `sample_types`

### Issues

- None

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '050a934a-173d-45ca-8e72-a97bbc8432e7' AND sample_types.deleted_at IS NULL
```

## `src.repositories.sample_repository.SampleRepository.resolve_include_reference.status`

- Repository: `src.repositories.sample_repository.SampleRepository`
- Method: `resolve_include_reference(status)`
- Purpose: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Planning Time: `0.106 ms`
- Execution Time: `0.052 ms`
- Node Types: `Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = '54cde2ec-d5f8-4dfb-9601-702a108b1391' AND statuses.deleted_at IS NULL
```

## `src.repositories.sample_targets_repository.SampleTargetRepository.get`

- Repository: `src.repositories.sample_targets_repository.SampleTargetRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.452 ms`
- Execution Time: `0.026 ms`
- Node Types: `Seq Scan`
- Relations: `sample_targets`

### Issues

- None

```sql
SELECT sample_targets.id, sample_targets.sample_id, sample_targets.research_goal_id, sample_targets.status_id, sample_targets.created_by, sample_targets.updated_by, sample_targets.created_at, sample_targets.updated_at, sample_targets.deleted_at 
FROM sample_targets 
WHERE sample_targets.id = '4bae43f8-adaf-488b-b443-6b2acc72f921' AND sample_targets.deleted_at IS NULL
```

## `src.repositories.sample_targets_repository.SampleTargetRepository.list.total`

- Repository: `src.repositories.sample_targets_repository.SampleTargetRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.212 ms`
- Execution Time: `0.067 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `sample_targets`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT sample_targets.id AS id, sample_targets.sample_id AS sample_id, sample_targets.research_goal_id AS research_goal_id, sample_targets.status_id AS status_id, sample_targets.created_by AS created_by, sample_targets.updated_by AS updated_by, sample_targets.created_at AS created_at, sample_targets.updated_at AS updated_at, sample_targets.deleted_at AS deleted_at 
FROM sample_targets 
WHERE sample_targets.deleted_at IS NULL) AS anon_1
```

## `src.repositories.sample_targets_repository.SampleTargetRepository.list.items`

- Repository: `src.repositories.sample_targets_repository.SampleTargetRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.087 ms`
- Execution Time: `0.063 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `sample_targets`

### Issues

- None

```sql
SELECT sample_targets.id, sample_targets.sample_id, sample_targets.research_goal_id, sample_targets.status_id, sample_targets.created_by, sample_targets.updated_by, sample_targets.created_at, sample_targets.updated_at, sample_targets.deleted_at 
FROM sample_targets 
WHERE sample_targets.deleted_at IS NULL ORDER BY sample_targets.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.sample_targets_repository.SampleTargetRepository.resolve_include_reference.research_goal`

- Repository: `src.repositories.sample_targets_repository.SampleTargetRepository`
- Method: `resolve_include_reference(research_goal)`
- Purpose: Загрузка include-ссылки `research_goal` по FK для обогащения DTO.
- Planning Time: `0.073 ms`
- Execution Time: `0.041 ms`
- Node Types: `Seq Scan`
- Relations: `research_goals`

### Issues

- None

```sql
SELECT research_goals.id, research_goals.code, research_goals.name, research_goals.comment, research_goals.lab_id, research_goals.created_by, research_goals.updated_by, research_goals.created_at, research_goals.updated_at, research_goals.deleted_at 
FROM research_goals 
WHERE research_goals.id = 'cf6a156f-c942-4491-a2fb-635124f37a6f' AND research_goals.deleted_at IS NULL
```

## `src.repositories.sample_targets_repository.SampleTargetRepository.resolve_include_reference.sample`

- Repository: `src.repositories.sample_targets_repository.SampleTargetRepository`
- Method: `resolve_include_reference(sample)`
- Purpose: Загрузка include-ссылки `sample` по FK для обогащения DTO.
- Planning Time: `0.130 ms`
- Execution Time: `0.097 ms`
- Node Types: `Index Scan`
- Relations: `samples`

### Issues

- None

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = 'e7cc5ead-20e5-43fe-be45-ea6758471214' AND samples.deleted_at IS NULL
```

## `src.repositories.sample_targets_repository.SampleTargetRepository.resolve_include_reference.status`

- Repository: `src.repositories.sample_targets_repository.SampleTargetRepository`
- Method: `resolve_include_reference(status)`
- Purpose: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Planning Time: `0.095 ms`
- Execution Time: `0.051 ms`
- Node Types: `Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = '54cde2ec-d5f8-4dfb-9601-702a108b1391' AND statuses.deleted_at IS NULL
```

## `src.repositories.sample_types_repository.SampleTypeRepository.get`

- Repository: `src.repositories.sample_types_repository.SampleTypeRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.096 ms`
- Execution Time: `0.048 ms`
- Node Types: `Seq Scan`
- Relations: `sample_types`

### Issues

- None

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '050a934a-173d-45ca-8e72-a97bbc8432e7' AND sample_types.deleted_at IS NULL
```

## `src.repositories.sample_types_repository.SampleTypeRepository.list.total`

- Repository: `src.repositories.sample_types_repository.SampleTypeRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.151 ms`
- Execution Time: `0.069 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `sample_types`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT sample_types.id AS id, sample_types.code AS code, sample_types.name AS name, sample_types.created_by AS created_by, sample_types.updated_by AS updated_by, sample_types.created_at AS created_at, sample_types.updated_at AS updated_at, sample_types.deleted_at AS deleted_at 
FROM sample_types 
WHERE sample_types.deleted_at IS NULL) AS anon_1
```

## `src.repositories.sample_types_repository.SampleTypeRepository.list.items`

- Repository: `src.repositories.sample_types_repository.SampleTypeRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.120 ms`
- Execution Time: `0.145 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `sample_types`

### Issues

- None

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.deleted_at IS NULL ORDER BY sample_types.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.samples_repository.SampleRepository.get`

- Repository: `src.repositories.samples_repository.SampleRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.167 ms`
- Execution Time: `0.108 ms`
- Node Types: `Index Scan`
- Relations: `samples`

### Issues

- None

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.id = 'e7cc5ead-20e5-43fe-be45-ea6758471214' AND samples.deleted_at IS NULL
```

## `src.repositories.samples_repository.SampleRepository.list.total`

- Repository: `src.repositories.samples_repository.SampleRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.118 ms`
- Execution Time: `13.846 ms`
- Node Types: `Aggregate, Index Only Scan`
- Relations: `samples`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT samples.id AS id, samples.month_no AS month_no, samples.name AS name, samples.alternate_name AS alternate_name, samples.mass AS mass, samples.target_description AS target_description, samples.comment AS comment, samples.section AS section, samples.delivery AS delivery, samples.nomenclature_code AS nomenclature_code, samples.batch_code AS batch_code, samples.supplier AS supplier, samples.is_urgent AS is_urgent, samples.is_done AS is_done, samples.sample_type_id AS sample_type_id, samples.status_id AS status_id, samples.direction_id AS direction_id, samples.protocol_id AS protocol_id, samples.created_by AS created_by, samples.updated_by AS updated_by, samples.sampled_at AS sampled_at, samples.received_at AS received_at, samples.completed_at AS completed_at, samples.created_at AS created_at, samples.updated_at AS updated_at, samples.deleted_at AS deleted_at 
FROM samples 
WHERE samples.deleted_at IS NULL) AS anon_1
```

## `src.repositories.samples_repository.SampleRepository.list.items`

- Repository: `src.repositories.samples_repository.SampleRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.159 ms`
- Execution Time: `59.488 ms`
- Node Types: `Gather Merge, Limit, Seq Scan, Sort`
- Relations: `samples`

### Issues

- [medium] `slow_execution_time`: Execution Time 59.49 ms >= 50.00 ms.
- [high] `large_seq_scan`: Seq Scan on `samples` with Actual Rows=33333 (threshold=1000).
- [medium] `row_estimate_mismatch`: Large row estimate mismatch: max ratio=3333.36, threshold=20.00.

```sql
SELECT samples.id, samples.month_no, samples.name, samples.alternate_name, samples.mass, samples.target_description, samples.comment, samples.section, samples.delivery, samples.nomenclature_code, samples.batch_code, samples.supplier, samples.is_urgent, samples.is_done, samples.sample_type_id, samples.status_id, samples.direction_id, samples.protocol_id, samples.created_by, samples.updated_by, samples.sampled_at, samples.received_at, samples.completed_at, samples.created_at, samples.updated_at, samples.deleted_at 
FROM samples 
WHERE samples.deleted_at IS NULL ORDER BY samples.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.samples_repository.SampleRepository.resolve_include_reference.direction`

- Repository: `src.repositories.samples_repository.SampleRepository`
- Method: `resolve_include_reference(direction)`
- Purpose: Загрузка include-ссылки `direction` по FK для обогащения DTO.
- Planning Time: `0.224 ms`
- Execution Time: `0.324 ms`
- Node Types: `Index Scan`
- Relations: `directions`

### Issues

- None

```sql
SELECT directions.id, directions.year_no, directions.base_no, directions.is_done, directions.is_urgent, directions.doctor_id, directions.object_id, directions.status_id, directions.created_by, directions.updated_by, directions.sampled_at, directions.received_at, directions.completed_at, directions.created_at, directions.updated_at, directions.deleted_at 
FROM directions 
WHERE directions.id = '635bc7fb-4aa7-4dca-9ef2-9c9de81ae950' AND directions.deleted_at IS NULL
```

## `src.repositories.samples_repository.SampleRepository.resolve_include_reference.protocol`

- Repository: `src.repositories.samples_repository.SampleRepository`
- Method: `resolve_include_reference(protocol)`
- Purpose: Загрузка include-ссылки `protocol` по FK для обогащения DTO.
- Planning Time: `0.151 ms`
- Execution Time: `0.028 ms`
- Node Types: `Seq Scan`
- Relations: `protocols`

### Issues

- None

```sql
SELECT protocols.id, protocols.year_no, protocols.copies, protocols.is_signed, protocols.protocol_copy_name, protocols.excerpt_copy_name, protocols.conclusion_id, protocols.protocol_type_id, protocols.created_by, protocols.updated_by, protocols.issued_at, protocols.created_at, protocols.updated_at, protocols.deleted_at 
FROM protocols 
WHERE protocols.id = '1bef39c9-749a-4df5-93a8-70e4044f9243' AND protocols.deleted_at IS NULL
```

## `src.repositories.samples_repository.SampleRepository.resolve_include_reference.sample_type`

- Repository: `src.repositories.samples_repository.SampleRepository`
- Method: `resolve_include_reference(sample_type)`
- Purpose: Загрузка include-ссылки `sample_type` по FK для обогащения DTO.
- Planning Time: `0.090 ms`
- Execution Time: `0.053 ms`
- Node Types: `Seq Scan`
- Relations: `sample_types`

### Issues

- None

```sql
SELECT sample_types.id, sample_types.code, sample_types.name, sample_types.created_by, sample_types.updated_by, sample_types.created_at, sample_types.updated_at, sample_types.deleted_at 
FROM sample_types 
WHERE sample_types.id = '050a934a-173d-45ca-8e72-a97bbc8432e7' AND sample_types.deleted_at IS NULL
```

## `src.repositories.samples_repository.SampleRepository.resolve_include_reference.status`

- Repository: `src.repositories.samples_repository.SampleRepository`
- Method: `resolve_include_reference(status)`
- Purpose: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Planning Time: `0.073 ms`
- Execution Time: `0.044 ms`
- Node Types: `Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = '54cde2ec-d5f8-4dfb-9601-702a108b1391' AND statuses.deleted_at IS NULL
```

## `src.repositories.statuses_repository.StatusRepository.get`

- Repository: `src.repositories.statuses_repository.StatusRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.068 ms`
- Execution Time: `0.042 ms`
- Node Types: `Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = '54cde2ec-d5f8-4dfb-9601-702a108b1391' AND statuses.deleted_at IS NULL
```

## `src.repositories.statuses_repository.StatusRepository.list.total`

- Repository: `src.repositories.statuses_repository.StatusRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.185 ms`
- Execution Time: `0.072 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT statuses.id AS id, statuses.code AS code, statuses.name AS name, statuses.created_at AS created_at, statuses.updated_at AS updated_at, statuses.deleted_at AS deleted_at 
FROM statuses 
WHERE statuses.deleted_at IS NULL) AS anon_1
```

## `src.repositories.statuses_repository.StatusRepository.list.items`

- Repository: `src.repositories.statuses_repository.StatusRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.103 ms`
- Execution Time: `0.115 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.deleted_at IS NULL ORDER BY statuses.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.tests_repository.TestRepository.get`

- Repository: `src.repositories.tests_repository.TestRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `1.035 ms`
- Execution Time: `0.118 ms`
- Node Types: `Index Scan`
- Relations: `tests`

### Issues

- None

```sql
SELECT tests.id, tests.value, tests.comment, tests.norm, tests.is_active, tests.result_id, tests.indicator_id, tests.status_id, tests.created_by, tests.updated_by, tests.created_at, tests.updated_at, tests.deleted_at 
FROM tests 
WHERE tests.id = '696728e1-52ef-490f-9b56-58e99155b969' AND tests.deleted_at IS NULL
```

## `src.repositories.tests_repository.TestRepository.list.total`

- Repository: `src.repositories.tests_repository.TestRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.303 ms`
- Execution Time: `50.270 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `tests`

### Issues

- [medium] `slow_execution_time`: Execution Time 50.27 ms >= 50.00 ms.
- [high] `large_seq_scan`: Seq Scan on `tests` with Actual Rows=100000 (threshold=1000).

```sql
SELECT count(*) AS count_1 
FROM (SELECT tests.id AS id, tests.value AS value, tests.comment AS comment, tests.norm AS norm, tests.is_active AS is_active, tests.result_id AS result_id, tests.indicator_id AS indicator_id, tests.status_id AS status_id, tests.created_by AS created_by, tests.updated_by AS updated_by, tests.created_at AS created_at, tests.updated_at AS updated_at, tests.deleted_at AS deleted_at 
FROM tests 
WHERE tests.deleted_at IS NULL) AS anon_1
```

## `src.repositories.tests_repository.TestRepository.list.items`

- Repository: `src.repositories.tests_repository.TestRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.164 ms`
- Execution Time: `86.203 ms`
- Node Types: `Gather Merge, Limit, Seq Scan, Sort`
- Relations: `tests`

### Issues

- [medium] `slow_execution_time`: Execution Time 86.20 ms >= 50.00 ms.
- [high] `large_seq_scan`: Seq Scan on `tests` with Actual Rows=50000 (threshold=1000).
- [medium] `row_estimate_mismatch`: Large row estimate mismatch: max ratio=2352.96, threshold=20.00.

```sql
SELECT tests.id, tests.value, tests.comment, tests.norm, tests.is_active, tests.result_id, tests.indicator_id, tests.status_id, tests.created_by, tests.updated_by, tests.created_at, tests.updated_at, tests.deleted_at 
FROM tests 
WHERE tests.deleted_at IS NULL ORDER BY tests.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.tests_repository.TestRepository.resolve_include_reference.indicator`

- Repository: `src.repositories.tests_repository.TestRepository`
- Method: `resolve_include_reference(indicator)`
- Purpose: Загрузка include-ссылки `indicator` по FK для обогащения DTO.
- Planning Time: `0.133 ms`
- Execution Time: `0.076 ms`
- Node Types: `Seq Scan`
- Relations: `indicators`

### Issues

- None

```sql
SELECT indicators.id, indicators.name, indicators.unit, indicators.norm_text, indicators.norm_value, indicators.default_text, indicators.comment, indicators.lab_id, indicators.sample_type_id, indicators.created_by, indicators.updated_by, indicators.created_at, indicators.updated_at, indicators.deleted_at 
FROM indicators 
WHERE indicators.id = 'e12f8f32-be03-4023-93df-552f26171422' AND indicators.deleted_at IS NULL
```

## `src.repositories.tests_repository.TestRepository.resolve_include_reference.result`

- Repository: `src.repositories.tests_repository.TestRepository`
- Method: `resolve_include_reference(result)`
- Purpose: Загрузка include-ссылки `result` по FK для обогащения DTO.
- Planning Time: `0.160 ms`
- Execution Time: `0.100 ms`
- Node Types: `Index Scan`
- Relations: `results`

### Issues

- None

```sql
SELECT results.id, results.comment, results.recommendation, results.is_done, results.lab_id, results.sample_id, results.status_id, results.created_by, results.updated_by, results.received_at, results.completed_at, results.created_at, results.updated_at, results.deleted_at 
FROM results 
WHERE results.id = '047bdd0f-ef67-496a-b16d-7e9b797ea215' AND results.deleted_at IS NULL
```

## `src.repositories.tests_repository.TestRepository.resolve_include_reference.status`

- Repository: `src.repositories.tests_repository.TestRepository`
- Method: `resolve_include_reference(status)`
- Purpose: Загрузка include-ссылки `status` по FK для обогащения DTO.
- Planning Time: `0.117 ms`
- Execution Time: `0.057 ms`
- Node Types: `Seq Scan`
- Relations: `statuses`

### Issues

- None

```sql
SELECT statuses.id, statuses.code, statuses.name, statuses.created_at, statuses.updated_at, statuses.deleted_at 
FROM statuses 
WHERE statuses.id = '54cde2ec-d5f8-4dfb-9601-702a108b1391' AND statuses.deleted_at IS NULL
```

## `src.repositories.user_roles_repository.UserRoleRepository.get`

- Repository: `src.repositories.user_roles_repository.UserRoleRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `1.453 ms`
- Execution Time: `0.040 ms`
- Node Types: `Seq Scan`
- Relations: `user_roles`

### Issues

- None

```sql
SELECT user_roles.id, user_roles.user_id, user_roles.role_id, user_roles.created_by, user_roles.updated_by, user_roles.created_at, user_roles.updated_at, user_roles.deleted_at 
FROM user_roles 
WHERE user_roles.id = '3ade72a4-f2f5-4062-891f-353da31b8e8a' AND user_roles.deleted_at IS NULL
```

## `src.repositories.user_roles_repository.UserRoleRepository.list.total`

- Repository: `src.repositories.user_roles_repository.UserRoleRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.211 ms`
- Execution Time: `0.079 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `user_roles`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT user_roles.id AS id, user_roles.user_id AS user_id, user_roles.role_id AS role_id, user_roles.created_by AS created_by, user_roles.updated_by AS updated_by, user_roles.created_at AS created_at, user_roles.updated_at AS updated_at, user_roles.deleted_at AS deleted_at 
FROM user_roles 
WHERE user_roles.deleted_at IS NULL) AS anon_1
```

## `src.repositories.user_roles_repository.UserRoleRepository.list.items`

- Repository: `src.repositories.user_roles_repository.UserRoleRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.125 ms`
- Execution Time: `0.160 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `user_roles`

### Issues

- None

```sql
SELECT user_roles.id, user_roles.user_id, user_roles.role_id, user_roles.created_by, user_roles.updated_by, user_roles.created_at, user_roles.updated_at, user_roles.deleted_at 
FROM user_roles 
WHERE user_roles.deleted_at IS NULL ORDER BY user_roles.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.user_roles_repository.UserRoleRepository.resolve_include_reference.role`

- Repository: `src.repositories.user_roles_repository.UserRoleRepository`
- Method: `resolve_include_reference(role)`
- Purpose: Загрузка include-ссылки `role` по FK для обогащения DTO.
- Planning Time: `0.100 ms`
- Execution Time: `0.036 ms`
- Node Types: `Seq Scan`
- Relations: `roles`

### Issues

- None

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = 'a46d12db-a288-40c7-a1b0-dff45296d4df'
```

## `src.repositories.user_roles_repository.UserRoleRepository.resolve_include_reference.user`

- Repository: `src.repositories.user_roles_repository.UserRoleRepository`
- Method: `resolve_include_reference(user)`
- Purpose: Загрузка include-ссылки `user` по FK для обогащения DTO.
- Planning Time: `0.955 ms`
- Execution Time: `0.074 ms`
- Node Types: `Seq Scan`
- Relations: `users`

### Issues

- None

```sql
SELECT users.id, users.username, users.password_hash, users.code, users.first_name, users.last_name, users.patronymic, users.is_registrar, users.is_lab_head, users.is_branch_head, users.role_id, users.lab_id, users.created_by, users.updated_by, users.created_at, users.updated_at, users.deleted_at 
FROM users 
WHERE users.id = '2bb3e404-2b81-460b-9802-dc1ee1040810' AND users.deleted_at IS NULL
```

## `src.repositories.users_repository.UserRepository.get`

- Repository: `src.repositories.users_repository.UserRepository`
- Method: `get`
- Purpose: Fetch a single entity by primary key with soft-delete filter.
- Planning Time: `0.131 ms`
- Execution Time: `0.077 ms`
- Node Types: `Seq Scan`
- Relations: `users`

### Issues

- None

```sql
SELECT users.id, users.username, users.password_hash, users.code, users.first_name, users.last_name, users.patronymic, users.is_registrar, users.is_lab_head, users.is_branch_head, users.role_id, users.lab_id, users.created_by, users.updated_by, users.created_at, users.updated_at, users.deleted_at 
FROM users 
WHERE users.id = '2bb3e404-2b81-460b-9802-dc1ee1040810' AND users.deleted_at IS NULL
```

## `src.repositories.users_repository.UserRepository.list.total`

- Repository: `src.repositories.users_repository.UserRepository`
- Method: `list.total`
- Purpose: Подсчет общего количества строк для pagination meta.total.
- Planning Time: `0.212 ms`
- Execution Time: `0.128 ms`
- Node Types: `Aggregate, Seq Scan`
- Relations: `users`

### Issues

- None

```sql
SELECT count(*) AS count_1 
FROM (SELECT users.id AS id, users.username AS username, users.password_hash AS password_hash, users.code AS code, users.first_name AS first_name, users.last_name AS last_name, users.patronymic AS patronymic, users.is_registrar AS is_registrar, users.is_lab_head AS is_lab_head, users.is_branch_head AS is_branch_head, users.role_id AS role_id, users.lab_id AS lab_id, users.created_by AS created_by, users.updated_by AS updated_by, users.created_at AS created_at, users.updated_at AS updated_at, users.deleted_at AS deleted_at 
FROM users 
WHERE users.deleted_at IS NULL) AS anon_1
```

## `src.repositories.users_repository.UserRepository.list.items`

- Repository: `src.repositories.users_repository.UserRepository`
- Method: `list.items`
- Purpose: Чтение страницы данных c сортировкой, offset и limit.
- Planning Time: `0.139 ms`
- Execution Time: `0.187 ms`
- Node Types: `Limit, Seq Scan, Sort`
- Relations: `users`

### Issues

- None

```sql
SELECT users.id, users.username, users.password_hash, users.code, users.first_name, users.last_name, users.patronymic, users.is_registrar, users.is_lab_head, users.is_branch_head, users.role_id, users.lab_id, users.created_by, users.updated_by, users.created_at, users.updated_at, users.deleted_at 
FROM users 
WHERE users.deleted_at IS NULL ORDER BY users.created_at DESC 
 LIMIT 25 OFFSET 0
```

## `src.repositories.users_repository.UserRepository.resolve_include_reference.lab`

- Repository: `src.repositories.users_repository.UserRepository`
- Method: `resolve_include_reference(lab)`
- Purpose: Загрузка include-ссылки `lab` по FK для обогащения DTO.
- Planning Time: `0.120 ms`
- Execution Time: `0.058 ms`
- Node Types: `Seq Scan`
- Relations: `labs`

### Issues

- None

```sql
SELECT labs.id, labs.branch_id, labs.code, labs.name, labs.full_name, labs.created_by, labs.updated_by, labs.created_at, labs.updated_at, labs.deleted_at 
FROM labs 
WHERE labs.id = '2b7fe5cd-aedb-49e3-a679-fffab477f0d3' AND labs.deleted_at IS NULL
```

## `src.repositories.users_repository.UserRepository.resolve_include_reference.role`

- Repository: `src.repositories.users_repository.UserRepository`
- Method: `resolve_include_reference(role)`
- Purpose: Загрузка include-ссылки `role` по FK для обогащения DTO.
- Planning Time: `0.099 ms`
- Execution Time: `0.037 ms`
- Node Types: `Seq Scan`
- Relations: `roles`

### Issues

- None

```sql
SELECT roles.id, roles.key, roles.name, roles.created_at, roles.updated_at 
FROM roles 
WHERE roles.id = 'a46d12db-a288-40c7-a1b0-dff45296d4df'
```
