# Базовые компоненты UI

## BaseTable

Файл: `src/shared/components/BaseTable.vue`

Назначение: единая обертка для server-side таблиц с фильтрами, пагинацией и action-slot.

### Основные props

- `columns: TableColumn[]`
- `data: any[]`
- `total: number`
- `loading: boolean`
- `readOnly?: boolean`
- `selectionMode?: 'single' | 'multiple'`
- `showSelectionColumn?: boolean`
- `rowKey?: string`

### Основные emits

- `page`
- `sort`
- `filter`
- `refresh`

### Встроенные возможности

- global search
- диалог фильтров
- date range filter
- multi-select filter
- delivery time presets (`none`, `last30`, `today`, `week`, `month`, `custom`)
- lazy DataTable + Paginator
- общее количество для пагинации (`totalRecords`) берется из `meta.total` API-ответа через проп `total`
- skeleton строки в loading режиме

### Slot'ы

- `toolbar-actions`
- `actions` для row-level действий

## BaseDialog

Файл: `src/shared/components/BaseDialog.vue`

Назначение: единый контейнер для view/edit/create диалогов с TabView.

### Props

- `visible`
- `mode: 'view' | 'edit' | 'create'`
- `title`
- `loading?`
- `readOnly?`
- `canEdit?`
- `actionScope?: 'all' | 'details'`
- `detailsTabIndex?`

### Emits

- `close`
- `save`
- `edit`

### Slot'ы

- `tabs`
- `footer` (опционально)

## ConfirmDelete

Файл: `src/shared/components/ConfirmDelete.ts`

Обертка над PrimeVue `useConfirm()`.

Назначение: стандартизировать destructive-action подтверждения.

Использование:

```ts
const confirm = useConfirmDelete()
confirm(t('common.deleteConfirm'), async () => {
  await apiDelete()
})
```

## RowActions

Файл: `src/shared/components/RowActions.vue`

Назначение: типовой ряд action-кнопок по ресурсу:

- view
- edit
- delete

Права проверяются через `usePermission`.
