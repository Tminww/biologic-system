---
icon: lucide/code
tags:
  - API
  - Reference
---

# Справочник кода API

:::note
**Источник API Reference**

Интерактивный справочник API доступен в Zudoku по адресу `/api` и строится из `docs-site/apis/openapi.json`.
:::

## Точка входа

- `app/main.py`
- `app/app_factory.py`

## Роутинг API v1

- `app/api/v1/router.py`
- `app/api/v1/endpoints/health.py`
- `app/api/v1/endpoints/samples.py`

## Сервисный слой и DTO

- `app/services/samples_service.py`
- `app/repositories/sample_repository.py`
- `app/schemas/sample.py`

## Проверка локально

```bash
make docs-dev
```

После запуска откройте:

1. `http://localhost:3000/index` — страницы документации.
2. `http://localhost:3000/api` — API Reference.

Если API Reference не обновился, пересоберите `docs-site/apis/openapi.json`, затем повторите `make docs-build`.
