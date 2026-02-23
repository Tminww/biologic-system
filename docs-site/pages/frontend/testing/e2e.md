# E2E тестирование

## Инструмент

- Playwright (`@playwright/test`)

## Запуск

```bash
npm run test:e2e
```

## Набор тестов

Тесты расположены в `tests/`:

- `auth.spec.ts`: login/logout сценарий
- `navigation.spec.ts`: переходы по основным разделам
- `permissions.spec.ts`: ограничения доступа для роли doctor
- `objects.spec.ts`: базовая загрузка модуля объектов
- `dialog-actions.spec.ts`: поведение action-диалогов
- `overrides-badge.spec.ts`: индикаторы overrides в users

## Вспомогательные утилиты

`tests/helpers.ts`:

- `login(page, login, password)`
- `attachPageErrors(page)`

`login()` ожидает значение логина (`admin`, `doctor`, `tech`), а не email.

## Рекомендации по расширению тестов

- Добавлять smoke-тест на каждый новый CRUD модуль
- Проверять как минимум `view/create/edit/delete` с RBAC-ограничениями
- Добавлять отдельные тесты на hash-сценарии (`#create`, `#filters`, `#import`)
- Добавлять тест на optimistic rollback для конфликтных обновлений (`409`)
- Для CI окружений проверять, что runner может открыть локальный webServer (`127.0.0.1:4173`)
