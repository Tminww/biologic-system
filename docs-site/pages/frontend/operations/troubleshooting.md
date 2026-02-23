# Troubleshooting

## Не проходит логин в mock

Проверьте, что логин передается как `login`, а не `email`.

Рабочие пары:

- `admin/admin123`
- `doctor/doctor123`
- `tech/tech123`

## После смены ролей права не обновились

- Проверьте, что был вызван `auth.restoreSession()`
- Для текущего пользователя это делается в `UsersPage` после сохранения
- При необходимости обновите страницу

## Кнопка видна, но не кликается

Это ожидаемое RBAC-поведение:

- UI не скрывает запрещенные действия
- Кнопка блокируется и показывает lock/tooltip

Проверяйте наличие permission в `auth.permissions`.

## Не работает фильтрация таблицы

Проверьте:

- корректность `filters` shape в `TableFilters`
- соответствие `column.field` backend полям
- поддержку field path (например, `department.name`) на backend

## Backend отвечает `Unknown field: page`

Если backend возвращает `400` с ошибкой вида `Unknown field: page`:

- frontend должен отправлять пагинацию через `offset` и `limit`
- проверьте, что в запросе нет `page` и `size`
- для модулей на `useServerTable` используется сериализация `offset/limit`

## Backend отвечает 422 по `sort_order`

Если backend возвращает ошибку валидации вида `sort_order: Input should be 'asc' or 'desc'`:

- frontend должен отправлять `sort_order=asc|desc`, а не `1|-1`
- `sort_by` должен быть в snake_case (например, `updated_at`)
- проверьте, что в URL нет legacy-параметров `sortField`/`sortOrder`

## Backend отвечает `Unknown field: filters`

Если backend не поддерживает query-параметр `filters`:

- установите `VITE_API_SUPPORTS_FILTERS=false`
- убедитесь, что в URL нет `filters` и `global`
- для FastAPI-контракта оставьте только `offset`, `limit`, `sort_by`, `sort_order`, `include`

## Часто приходит 409 при сохранении объекта

Значит `updatedAt` устарел.

Решение:

- выполнить refresh списка
- открыть запись повторно
- повторить сохранение

## Приложение ведет себя странно в mock режиме

Сбросьте localStorage ключи mock:

- `mock_users_v3`
- `mock_objects_v3`
- `mock_overrides_v3`
- `mock_session_user_v3`
- `mock_catalogs_v3`
- `mock_role_permissions_v3`
- `mock_quick_actions_v1`

## VitePress не запускается

Если `vitepress` не установлен как dev dependency, используйте:

```bash
npx vitepress dev docs
```

или установите пакет локально:

```bash
npm i -D vitepress
```

## Playwright не может поднять webServer

Если `npm run test:e2e` завершается сообщением `Process from config.webServer was not able to start`:

- проверьте, что порт `4173` доступен
- проверьте, что среда запуска разрешает соединения к `127.0.0.1`
- временно запустите `npm run dev -- --host 127.0.0.1 --port 4173` вручную и убедитесь, что URL открывается
