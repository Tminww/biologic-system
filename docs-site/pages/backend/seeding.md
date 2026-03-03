---
icon: lucide/sprout
tags:
  - Database
  - Seeding
---

# Начальное заполнение тестовыми данными

## Цель

Создать воспроизводимый набор данных для локальной разработки, API-тестов и проверки серверных таблиц frontend.

## Общие требования

1. Генерировать `UUID v7` для всех PK/FK.
2. Соблюдать ссылочную целостность между сущностями.
3. Создавать timezone-aware значения времени.
4. Не генерировать soft deleted записи в базовом профиле.

## Профили генерации

1. `tiny`:
   - минимальный набор для smoke (1-5 записей на таблицу)
2. `dev`:
   - рабочий набор для локального UI (50-500 записей в зависимости от таблицы)
3. `perf-lite`:
   - проверка тяжелых `SELECT` и пагинации (10k+ записей в горячих таблицах)

## Минимальный порядок генерации

1. Справочники: `branches`, `laboratories`, `roles`, `statuses`, `sample_types`, `protocol_types`, `conclusion_statuses`
2. Пользователи и права: `users`, `roles`, `permissions`, `role_permissions`, `user_scopes`
3. Бизнес-контекст: `objects`, `doctors`, `research_goals`, `indicators`
4. Процессные сущности: `directions`, `samples`, `sample_targets`, `results`, `tests`
5. Финализация: `conclusions`, `protocols`
6. Аудит: `change_log` (опционально для тестов)

## Контракт seed-утилиты

```bash
uv run python -m scripts.seed_data --profile dev --truncate
```

:::note
**Docker Compose policy**

Контейнер `biologic-dev-migrations` выполняет только миграции (`alembic upgrade head`).
Генерация тестовых данных запускается вручную отдельной командой.
:::

Параметры:

- `--profile {tiny,dev,perf-lite}`
- `--reference-count` количество записей для каждой справочной сущности (`0..100`)
- `--directions` количество записей в `directions` (`0..1000000`)
- `--samples` количество записей в `samples` (`0..1000000`)
- `--results` количество записей в `results` (`0..1000000`)
- `--tests` количество записей в `tests` (`0..1000000`)
- `--truncate` для очистки перед заполнением
- `--database-url` для явного DSN (иначе `APP_ALEMBIC_DATABASE_URL`/`APP_DATABASE_URL`)

Пример нагрузки по 1 000 000 записей в горячих таблицах:

```bash
uv run python -m scripts.seed_data \
  --reference-count 100 \
  --directions 1000000 \
  --samples 1000000 \
  --results 1000000 \
  --tests 1000000
```

Через `Makefile` (с передачей аргументов, включая явное подключение к БД):

```bash
make seed-data SEED_ARGS="--database-url postgresql+asyncpg://biologic:biologic@127.0.0.1:5432/biologic --reference-count 100 --directions 1000000 --samples 1000000 --results 1000000 --tests 1000000"
```

## Проверки после генерации

1. Для каждой таблицы есть данные.
2. Нет битых FK.
3. Пагинация и фильтры возвращают стабильные данные.
4. Запросы `SELECT` используют индексы на горячих условиях.

## Анализ ORM-запросов после seed

После генерации данных можно автоматически запустить анализ планов для всех ORM query-path в `app/repositories`:

```bash
uv run python -m scripts.analyze_orm_query_plans --seed-profile perf-lite --truncate
```

Результат:

1. Каталог SQL-запросов и назначений: `docs/content/repository-query-catalog.md`
2. Markdown-отчет по неэффективности: `artifacts/orm-query-plan-report.md`
3. JSON-отчет для автоматической обработки: `artifacts/orm-query-plan-report.json`
