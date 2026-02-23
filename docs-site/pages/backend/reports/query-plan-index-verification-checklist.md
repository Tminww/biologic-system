---
icon: lucide/list-checks
tags:
  - Performance
  - Database
  - Verification
---

# Чек-лист верификации индексов для list-запросов

Цель: подтвердить, что индексы из миграции `20260219_0003` снижают стоимость `list.items` запросов на high-load таблицах.

## Область проверки

- `src.repositories.directions_repository.DirectionRepository.list.items`
- `src.repositories.results_repository.ResultRepository.list.items`
- `src.repositories.sample_repository.SampleRepository.list.items`
- `src.repositories.samples_repository.SampleRepository.list.items`
- `src.repositories.tests_repository.TestRepository.list.items`
- Контрольный запрос: `src.repositories.tests_repository.TestRepository.list.total`

## Базовые метрики (до индексов)

Снимок из отчета `reports/orm-query-plan-report-2026-02-19.md`:

| Query ID | Execution (ms) | Issues |
| --- | ---: | --- |
| directions.list.items | `158.810` | `slow_execution_time`, `large_seq_scan`, `row_estimate_mismatch` |
| results.list.items | `38.517` | `large_seq_scan`, `row_estimate_mismatch` |
| sample.list.items | `76.293` | `slow_execution_time`, `large_seq_scan`, `row_estimate_mismatch` |
| samples.list.items | `59.488` | `slow_execution_time`, `large_seq_scan`, `row_estimate_mismatch` |
| tests.list.items | `86.203` | `slow_execution_time`, `large_seq_scan`, `row_estimate_mismatch` |
| tests.list.total | `50.270` | `slow_execution_time`, `large_seq_scan` |

## Шаги верификации

1. Применить миграции:

```bash
uv run alembic upgrade head
```

2. Пересобрать perf-набор и получить новый план:

```bash
uv run python -m scripts.analyze_orm_query_plans \
  --seed-profile perf-lite \
  --truncate \
  --database-url postgresql://biologic:biologic@localhost:5432/biologic
```

3. Сравнить целевые query-id по JSON-отчету:

```bash
python - <<'PY'
import json
from pathlib import Path

target = {
    "src.repositories.directions_repository.DirectionRepository.list.items",
    "src.repositories.results_repository.ResultRepository.list.items",
    "src.repositories.sample_repository.SampleRepository.list.items",
    "src.repositories.samples_repository.SampleRepository.list.items",
    "src.repositories.tests_repository.TestRepository.list.items",
    "src.repositories.tests_repository.TestRepository.list.total",
}

report = json.loads(Path("artifacts/orm-query-plan-report.json").read_text())
for q in report["queries"]:
    if q["query_id"] in target:
        codes = ", ".join(i["code"] for i in q["issues"]) or "-"
        print(f'{q["query_id"]}: exec={q["execution_time_ms"]:.3f}ms; issues={codes}; nodes={", ".join(q["node_types"])}')
PY
```

## Критерии приемки

1. Для `*.list.items`:
- в плане есть `Index Scan` или `Index Only Scan` по новым индексам;
- отсутствует деградация относительно baseline по `Execution Time`;
- `large_seq_scan` не детектируется на целевых таблицах.

2. Для `tests.list.total`:
- запрос не должен ухудшиться после добавления индексов;
- если `large_seq_scan` сохраняется, фиксируется отдельной задачей (оптимизация стратегии `meta.total`).

3. Артефакты обновлены:
- `artifacts/orm-query-plan-report.md`
- `artifacts/orm-query-plan-report.json`
- `docs/content/repository-query-catalog.md`

## Что делать, если критерии не пройдены

1. Проверить, что миграция `20260219_0003` применена (`alembic current`).
2. Выполнить `ANALYZE` для таблиц `directions`, `samples`, `results`, `tests`.
3. Повторить анализ планов на том же seed-профиле.
4. Если `tests.list.total` по-прежнему узкое место, вынести оптимизацию total-count в отдельную задачу (cached total или опциональный `include_total`).
