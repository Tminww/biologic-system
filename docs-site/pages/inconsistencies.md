# Журнал расхождений backend/docs и frontend/docs

Дата фиксации: **23 февраля 2026**.

Документ хранит историю расхождений и их текущий статус после консолидации.
Канонические решения зафиксированы в `docs/integration-contract.md`.

| # | Область | Расхождение | Риск | Канон | Статус |
| --- | --- | --- | --- | --- | --- |
| 1 | Модель auth | backend описывает JWT cookie + refresh, frontend местами как session-only | Неполный auth-flow | Cookie-based auth + `login/me/refresh/logout` | Закрыто |
| 2 | Поле логина | backend: `username`, frontend: `login` | Ошибки 401/422 | Transport: `username`, UI `login` через маппинг | Закрыто |
| 3 | `auth/me` payload | backend акцентирует TTL, frontend — user+permissions | Разные ожидания store | `user + permissions`, TTL как optional | Закрыто |
| 4 | Тип `id` | UUID vs number | Ошибки типизации и сериализации | UUID как API-канон | Закрыто (с legacy-окном) |
| 5 | Метод update | PATCH vs PUT | Несовместимые вызовы | PATCH как канон | Закрыто |
| 6 | List envelope | `{ items, meta }` vs `{ data, meta }` | Ошибки парсинга таблиц | Только `{ items, meta }` | Закрыто |
| 7 | Include meta key | `includes_requested` vs `includes_request` | Разъезд типов | `includes_requested` + временный alias | Закрыто |
| 8 | Naming policy | snake_case vs camelCase в transport | Дубли маппинга | snake_case transport, camelCase только в UI модели | Закрыто |
| 9 | Ресурс ролей | `/roles*` vs `/user-types` | Неконсистентные маршруты | `/roles*` как backend API; `/user-types` как route alias | Закрыто |
| 10 | User permission overrides | endpoint у frontend есть, в backend может быть частично | Частичная недоступность админки | Endpoint целевой, до полной реализации — feature flag | В работе |

## Приоритет контроля

1. Любые новые расхождения добавляются в этот файл в день обнаружения.
2. Закрытие расхождения фиксируется одновременно в `docs/integration-contract.md`.
3. После закрытия legacy-совместимость должна иметь план удаления.
