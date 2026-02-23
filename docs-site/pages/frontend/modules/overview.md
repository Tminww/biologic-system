# Карта модулей

## Навигационные домены

### Основное

- `/dashboard`

### Рабочие процессы

- `/directions`
- `/samples`
- `/protocols`
- `/results`
- `/conclusions`
- `/tests`

### Персонал и структура

- `/doctors`
- `/departments`
- `/labs`
- `/admin/users`

### Справочники

- `/research-goals`
- `/sample-targets`
- `/sample-types`
- `/indicators`
- `/protocol-types`
- `/statuses`
- `/user-types`
- `/objects`

## Общий шаблон CRUD-модуля

Почти все модули используют один и тот же pipeline:

1. `useServerTable` для списка
2. `BaseTable` для отображения
3. `useCrudDialog` для состояния диалога
4. `BaseDialog` или `CatalogDialog`
5. `useOptimistic` + `useConfirmDelete`
6. `useDialogHash` + `useTableHash`

## Модули с дополнительными сценариями

- `directions`: импорт файла и генерация протокола
- `samples`: реестр и генерация протокола по выбранным строкам
- `dashboard`: quick actions с персональными ссылками
- `admin/users`: персональные overrides прав
- `user-types`: базовые permissions ролей

## Роут-алиасы

- `/entities` -> `/objects`
- `/resobjects` -> `/objects`
- `/users-registry` -> `/admin/users`
