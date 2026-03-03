---
icon: lucide/shield-check
tags:
  - ADR
  - Access
---

# ADR-0007: RBAC-модель с каталогом разрешений и scope-привязкой

- Status: Accepted
- Date: 2026-03-03

## Context

Текущая модель доступа использует `roles`, `users`, `role_permissions(resource, action)` и legacy-таблицу `user_roles`.
Для филиальной лабораторной системы требуется:

1. Явно разделить каталог разрешений и назначения разрешений ролям.
2. Поддержать ограничение видимости по области (`филиал`, `лаборатория`, `объект`) на уровне пользователя.
3. Зафиксировать единые ключи ролей и общий словарь для backend/frontend.

## Decision

Принять следующую целевую структуру разграничения доступа:

1. `roles(id, key, name, scope_type)`.
2. `users(..., role_id, ...)` — существующие пользовательские атрибуты сохраняются.
3. `permissions(id, resource, action)` с `UNIQUE(resource, action)`.
4. `role_permissions(id, role_id, permission_id)` с `UNIQUE(role_id, permission_id)`.
5. `user_scopes(id, user_id, scope_id)` для области видимости пользователя.

Дополнительно:

1. `scope_type` принимает значения: `global`, `own_branch`, `own_lab`, `own_objects`.
2. `scope_id IS NULL` в `user_scopes` трактуется как «вся область» для роли с ограниченным scope.
3. `user_roles` переводится в legacy и исключается из целевой модели.

Канонические ключи ролей:

1. `admin`
2. `branch_chief`
3. `lab_chief`
4. `registrar`
5. `lab_doctor`
6. `laborant`
7. `sanitary_inspector`

## Consequences

Плюсы:

1. Права отделены от ролей как отдельный справочник, проще управлять и расширять действия.
2. Видимость данных задаётся единообразно через `user_scopes` и `scope_type`.
3. Устраняется дублирование концепций (`users.role_id` и `user_roles`).

Минусы:

1. Требуется миграция данных и пересборка репозиториев/DTO/API по RBAC.
2. `scope_id` является полиморфной ссылкой и требует явной серверной валидации.
3. Нужен переходный период для legacy-контрактов (`user_roles`, старый `role_permissions` PK).

## Alternatives Considered

1. Оставить `role_permissions(resource, action)` без таблицы `permissions`.
2. Оставить `user_roles` как основную таблицу назначения ролей.
3. Хранить scope-привязки в `users` фиксированными FK-полями (`branch_id`, `lab_id`, `object_id`).

