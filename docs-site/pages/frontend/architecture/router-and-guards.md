# Роутинг и Guards

## Каркас маршрутов

Router описан в `src/app/router.ts` и делится на 2 layout-ветки:

- `/login` под `AuthLayout` (public)
- `/` под `MainLayout` (protected)

### Ключевые маршруты

- `/dashboard`
- `/objects` (с alias-redirect из `/entities` и `/resobjects`)
- `/admin/users` (с alias-redirect из `/users-registry`)
- Каталожные разделы: `/directions`, `/samples`, `/protocols`, `/results`, `/tests`, и т.д.

## Meta поля

Для контроля доступа используются:

- `meta.public`
- `meta.requiresAuth`
- `meta.resource`
- `meta.action`

Пример:

```ts
{
  path: 'admin/users',
  name: 'users',
  component: UsersPage,
  meta: { requiresAuth: true, resource: 'users', action: 'view' }
}
```

## Алгоритм global beforeEach

1. Если auth store не инициализирован, вызывается `auth.restoreSession()`
2. Если маршрут `public`, навигация разрешается
3. Если пользователь не авторизован, редирект на `/login`
4. Если маршрут требует permission и `!auth.can(resource, action)`, редирект на `/dashboard`

## Поведение sidebar

В `MainLayout` навигация всегда показывает все пункты, но запрещенные пункты:

- визуально `disabled`
- имеют lock-иконку
- показывают tooltip `Нет доступа`
- не вызывают переход при клике

Даже при видимом пункте доступ окончательно валидируется router guard'ом.

## Deep-linking через hash

Поддерживаемые hash-паттерны:

- `#create`
- `#view=123`, `#edit=123`
- legacy: `#edit-123`, `#edit:123`
- `#import` (для модуля направлений)
- `#filters`, `#filters=PresetName`
- `#registry` (для формы реестра образцов)

Реализовано через `useDialogHash` и `useTableHash`.
