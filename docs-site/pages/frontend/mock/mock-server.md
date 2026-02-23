# Mock server

## Где реализован

- `src/shared/api/mock.ts`
- данные seed: `src/shared/api/mock-data/*.json`

## Как включается

В `src/shared/api/client.ts`:

- если `VITE_API_MODE !== 'live'`, используется `mockFetch`

## Что поддерживает mock

- session auth
- role permissions
- user overrides
- server-side фильтрация, сортировка и пагинация
- CRUD для объектов, пользователей и каталогов
- quick actions dashboard
- дополнительные endpoint'ы (`/directions/import`, `/samples/protocol`)

## Тестовые пользователи

- `admin` / `admin123`
- `doctor` / `doctor123`
- `tech` / `tech123`

## RBAC в mock

- базовые права роли задаются в `rolePermissions`
- персональные overrides хранятся отдельно
- effective permissions вычисляются функцией `computeEffectivePermissions()`

## Персистентность

Mock хранит состояние в `localStorage`.

Основные ключи:

- `mock_users_v3`
- `mock_objects_v3`
- `mock_overrides_v3`
- `mock_session_user_v3`
- `mock_catalogs_v3`
- `mock_role_permissions_v3`
- `mock_quick_actions_v1`

Это позволяет сохранять изменения между перезагрузками браузера.

## Сброс состояния mock

Варианты:

1. Очистить соответствующие ключи вручную в DevTools
2. Выполнить `localStorage.clear()` в консоли браузера
3. Перезапустить приложение и войти заново

## Ограничения mock

- Нет реальной серверной валидации бизнес-правил в полном объеме
- Нет транзакций и конкурентного доступа как в production DB
- Форматы некоторых payload'ов либеральнее, чем на реальном backend
