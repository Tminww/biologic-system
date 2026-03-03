# Канонический контракт интеграции backend/frontend

Документ фиксирует финальные решения по расхождениям между сервисами.

## 1. Согласованные правила

| Область | Каноническое правило | Legacy-совместимость |
| --- | --- | --- |
| Auth модель | JWT access/refresh в `HttpOnly` cookies + `refresh` endpoint | Разрешена работа без явного использования refresh на frontend, но endpoint обязателен |
| Поле логина | `username` в transport payload `POST /auth/login` | UI может использовать `login` как внутреннее имя с обязательным маппингом -> `username` |
| `auth/me` | Возвращает `user`, `permissions`, тех. meta; TTL поля допустимы | Если TTL поля отсутствуют, frontend не ломается |
| Тип `id` | `UUID` в API-контрактах | Числовые legacy ID допустимы только в адаптерах миграции |
| Метод update | `PATCH /resource/{id}` | `PUT` допустим как legacy до полного удаления |
| List envelope | `{ items, meta }` | `{ data, meta }` запрещён для новых/обновлённых endpoint |
| Include meta key | `includes_requested` | `includes_request` читается как alias только на переходный период |
| Naming в API | `snake_case` transport | camelCase только внутри UI-моделей после преобразования |
| Role resources | `/roles`, `/permissions`, `/role_permissions`, `/user_scopes` | `/user-types` допустим только как UI route alias |
| User permission overrides | `/users/{id}/permissions` считается целевым контрактом | До полной реализации backend endpoint помечается как optional feature flag |
| Отображение ID в таблицах UI | Frontend не показывает технический `id`/`uuid` как значение колонки, вместо этого рендерит `№ = offset + rowIndex + 1` | `id`/`uuid` остаётся обязательным полем API и используется как технический идентификатор |
| Общее количество в пагинации UI | Frontend берет общее количество из `meta.total` list-ответа и передает его в PrimeVue `DataTable/Paginator totalRecords` | Локальный расчет total на frontend не используется |

## 2. Единый API baseline

1. Prefix: `/api/v1`
2. Auth: `/auth/login`, `/auth/me`, `/auth/refresh`, `/auth/logout`
3. Error format: `application/problem+json`
4. Pagination: `offset`, `limit`
5. Sorting: `sort_by`, `sort_order`
6. Include whitelist обязателен

## 3. Совместимость и миграция

1. Новые endpoint и новые поля сразу реализуются только по каноническим правилам.
2. Legacy alias допускаются временно и документируются с датой удаления.
3. Удаление legacy alias выполняется после синхронного обновления frontend + backend.

## 4. Контроль изменений

Перед релизом изменений API проверяются:

1. `docs/backend/api-guidelines.md`
2. `docs/frontend/api/modules-contracts.md`
3. `docs/inconsistencies.md`

Если найдено новое расхождение, сначала фиксируется в `docs/inconsistencies.md`, затем закрывается обновлением этого документа.
