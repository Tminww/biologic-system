---
icon: lucide/gauge-circle
tags:
  - Performance
  - Database
  - Optimization
---

# Оптимизация `list.total` (2026-02-19)

## Контекст

После ускорения `list.items` (индексы `..._active_created_at`) узким местом остались запросы `list.total` на high-load таблицах:

- `ResultRepository.list.total`
- `TestRepository.list.total`

В отчетах это проявлялось как `large_seq_scan`.

## Что изменено

1. Переписан SQL для `list.total` в базовом CRUD-репозитории:

- было: `SELECT count(*) FROM (SELECT ...все колонки... ) AS anon_1`
- стало: прямой `SELECT count(*) FROM <table> WHERE ...`

Это изменение сделано в:

- `app/repositories/crud_repository.py`
- `scripts/analyze_orm_query_plans.py` (синхронизация генерации каталога/отчета)
- `tests/repositories/test_query_plans.py` (синхронизация тестовой логики)

2. Добавлена миграция с partial-индексами для ускорения `COUNT` по активным строкам:

- `results_results_active_id` на `results (id) WHERE deleted_at IS NULL`
- `tests_tests_active_id` на `tests (id) WHERE deleted_at IS NULL`

Файл миграции:

- `alembic/versions/20260219_0004_optimize_total_count_indexes.py`

3. Выполнена дооптимизация для `TestRepository.list.total`:

- добавлена таблица счетчиков `entity_active_counts` и триггеры синхронизации для `tests`;
- в `TestRepository` реализован fast-path для unfiltered list:
  `SELECT active_total FROM entity_active_counts WHERE entity_name = 'tests'`;
- при наличии фильтров запрос автоматически падает обратно на стандартный `COUNT(*)`.

Файлы:

- `alembic/versions/20260219_0005_tests_total_counter.py`
- `app/repositories/tests_repository.py`

## Почему сделано именно так

1. `COUNT(created_at)` не дает выгоды против `COUNT(*)`, если `created_at` всегда заполнен.
2. Подзапрос с выборкой всех колонок для total усложняет план и не нужен для подсчета.
3. Для кейса soft-delete важна выборка только активных строк (`deleted_at IS NULL`), поэтому partial-индекс адресно покрывает рабочий фильтр.
4. Дооптимизация через счетчик сохраняет API-контракт: `meta.total` остается точным числом.
5. Fast-path применен только к `tests` без фильтров, чтобы не ломать корректность total для filtered выборок.

## Ожидаемый эффект

1. Снижение вероятности `Seq Scan` на `list.total` для `results/tests`.
2. Более стабильное время ответа list-endpoints под нагрузкой.
3. Более прозрачные SQL-планы в отчете анализа ORM-запросов.

## Проверка после применения

1. Применить миграции:

```bash
uv run alembic upgrade head
```

2. Повторно запустить анализ:

```bash
make analyze-orm-queries
```

3. Проверить в `artifacts/orm-query-plan-report.json`:

- `src.repositories.results_repository.ResultRepository.list.total`
- `src.repositories.tests_repository.TestRepository.list.total`

и убедиться, что количество/критичность проблем не увеличились и время `execution_time_ms` не деградировало.
