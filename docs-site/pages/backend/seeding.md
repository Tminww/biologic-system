---
icon: lucide/sprout
tags:
  - Database
  - Seeding
---

# Начальное заполнение тестовыми данными

## Цель

Создать воспроизводимый набор данных для локальной разработки, API-тестов и проверки серверных таблиц frontend.

## Минимальный порядок генерации

1. Справочники: `branches`, `labs`, `roles`, `direction_statuses`, `sample_statuses`, `research_statuses`, `test_statuses`, `sample_types`, `protocol_types`
2. Пользователи и права: `users`, `roles`, `permissions`, `role_permissions`, `user_scopes`
3. Бизнес-контекст: `objects`, `doctors`, `research_goals`, `indicators`
4. Процессные сущности: `directions`, `samples`, `research`, `tests`
5. Финализация: `conclusions`, `protocols`
6. Аудит: `change_log` (опционально для тестов)

## Контракт seed-утилиты

```bash
uv run python -m scripts.seed_data --profile dev --truncate
```

Параметры:

- `--profile {tiny,dev,perf-lite}`
- `--reference-count` количество записей для каждой справочной сущности (`0..100`)
- `--directions` количество записей в `directions` (`0..1000000`)
- `--samples` количество записей в `samples` (`0..1000000`)
- `--research` количество записей в `research` (`0..1000000`)
- `--tests` количество записей в `tests` (`0..1000000`)
- `--truncate` для очистки перед заполнением
- `--database-url` для явного DSN (иначе `APP_ALEMBIC_DATABASE_URL`/`APP_DATABASE_URL`)

Пример нагрузки по 1 000 000 записей в горячих таблицах:

```bash
uv run python -m scripts.seed_data \
  --reference-count 100 \
  --directions 1000000 \
  --samples 1000000 \
  --research 1000000 \
  --tests 1000000
```
