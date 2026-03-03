---
icon: lucide/table
tags:
  - Data model
  - Entity
---

# `permissions` — каталог разрешений

## Поля

- `id (uuid, DEFAULT uuidv7())` — Уникальный идентификатор разрешения.
- `resource (text, NOT NULL)` — Ресурс, к которому применяется разрешение (`samples`, `tests`, `results`, `directions`, ...).
- `action (text, NOT NULL)` — Действие над ресурсом (`read`, `create`, `register`, `reject`, `close`, `start`, ...).

## Ограничения

1. `UNIQUE (resource, action)`.

