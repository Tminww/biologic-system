# Остальные каталожные модули

## Список модулей

- `/directions`
- `/samples`
- `/sample-targets`
- `/sample-types`
- `/departments`
- `/labs`
- `/indicators`
- `/protocols`
- `/protocol-types`
- `/results`
- `/conclusions`
- `/doctors`
- `/research-goals`
- `/tests`
- `/statuses`

## Общий API-паттерн

Для большинства каталогов действует одинаковый набор endpoint'ов:

- `GET /<resource>`
- `POST /<resource>`
- `PUT /<resource>/:id`
- `DELETE /<resource>/:id`

Все list endpoint'ы возвращают:

```json
{
  "data": [],
  "meta": { "total": 0 }
}
```

## Нестандартные endpoint'ы

### Направления

- `POST /directions/import`
- `POST /directions/protocol`

### Образцы

- `POST /samples/protocol`

### Dashboard quick actions

- `GET /dashboard/quick-actions`
- `POST /dashboard/quick-actions`
- `PUT /dashboard/quick-actions/:id`
- `DELETE /dashboard/quick-actions/:id`

## Фильтрация и сортировка

Модули используют единый контракт `useServerTable`:

- `offset`, `limit`
- `sort_by`, `sort_order` (`asc` | `desc`)
- `global` (если `VITE_API_SUPPORTS_FILTERS=true`)
- `filters` (JSON string, если `VITE_API_SUPPORTS_FILTERS=true`)

## Hash сценарии

Стандартные:

- `#create`
- `#view=<id>`
- `#edit=<id>`
- `#filters`

Модульные:

- `#import` для `/directions`
- `#registry` для `/samples`
