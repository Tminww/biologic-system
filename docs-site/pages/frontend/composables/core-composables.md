# Ключевые composables

## useServerTable

Файл: `src/shared/composables/useServerTable.ts`

Управляет server-side таблицей.

### Состояние

- `data`, `total`, `loading`
- `pagination` (`page`, `size`) во внутреннем состоянии таблицы
- `sorting` (`field`, `order`)
- `filters`
- `presets`

### Методы

- `fetch()`
- `refresh()`
- `onPage(event)`
- `onSort(event)`
- `onFilter(event)`
- `savePreset(name)`
- `applyPreset(name)`
- `deletePreset(name)`

### Сериализация

Запрос собирается в query params:

- `offset` (0-based)
- `limit`
- `sort_by`
- `sort_order` (`asc` | `desc`)
- `global` (если `VITE_API_SUPPORTS_FILTERS=true`)
- `filters` (`JSON.stringify` column filters, если `VITE_API_SUPPORTS_FILTERS=true`)

Global search дебаунсится на 350ms.

Во внешний API пагинация отправляется как `offset/limit`.

Для отображения пагинации:

- `total` заполняется из `ReadListResponse.meta.total`
- это значение пробрасывается в `BaseTable`, где используется как `DataTable/Paginator totalRecords`

## useCrudDialog

Файл: `src/shared/composables/useCrudDialog.ts`

Управляет состоянием CRUD-диалога.

### Состояние

- `visible`
- `mode`
- `selected`
- `readOnly` (computed)

### Методы

- `openView(row)`
- `openEdit(row)`
- `openCreate()`
- `close()`
- `startEdit()`

Если нет права `edit`, `openEdit` автоматически переключается на `view`.

## useOptimistic

Файл: `src/shared/composables/useOptimistic.ts`

Упрощает optimistic update/delete.

### Методы

- `updateItem(targetRef, updatedItem)`
- `removeItem(targetRef, id)`
- `rollback(targetRef)`

`updateItem` и `removeItem` возвращают функцию rollback.

## usePermission

Файл: `src/shared/composables/usePermission.ts`

Тонкая обертка над `auth.can(resource, action)`.

## useToast

Файл: `src/shared/composables/useToast.ts`

Обертка над PrimeVue Toast сервисом.

Методы:

- `success(detail, summary?)`
- `info(detail, summary?)`
- `warn(detail, summary?)`
- `error(detail, summary?)`

## useDialogHash

Файл: `src/shared/composables/useDialogHash.ts`

Открывает диалоги из URL hash.

Поддерживает действия:

- `create`
- `view`
- `edit`
- `import`

## useTableHash

Файл: `src/shared/composables/useTableHash.ts`

Открывает панель фильтров таблицы из hash:

- `#filters`
- `#filters=PresetName`
- `#filters:PresetName`

## useTheme

Файл: `src/shared/composables/useTheme.ts`

Управляет светлой/темной темой через класс `app-dark` и localStorage ключ `app_theme`.
