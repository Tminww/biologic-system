# Модуль объектов (`/objects`)

## Назначение

Управление сущностями объекта исследования.

Основные файлы:

- `src/modules/entities/EntitiesPage.vue`
- `src/modules/entities/EntityDialog.vue`
- `src/modules/entities/entities.api.ts`

## Таблица

Колонки:

- `id`
- `name`
- `fullName`
- `address`
- `status`
- `category`
- `updatedAt`

Фильтры:

- text: `name`, `fullName`, `address`
- multi-select: `status`, `category`
- date range: `updatedAt`

Presets хранятся под ключом `objects`.

## CRUD и optimistic поведение

### Create

- `POST /objects`
- Новая запись добавляется в начало списка

### Update

- `PUT /objects/:id`
- Передается `updatedAt`
- Применяется optimistic update
- На `409 STALE_DATA`: rollback, toast и `table.refresh()`

### Delete

- `DELETE /objects/:id`
- Optimistic remove + rollback при ошибке

## Диалог

`EntityDialog` использует `BaseDialog` и две вкладки:

- Детали
- Связи (placeholder)

Валидация форм: native `reportValidity()`.

## Права

Ресурс: `objects`

- `view`: доступ к странице и просмотру
- `create`: кнопка создать
- `edit`: редактирование
- `delete`: удаление
