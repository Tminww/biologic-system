---
icon: lucide/flask-conical
tags:
  - Frontend
  - Mock
---

# Backend Mock Notes

Frontend не содержит локального mock API и не мокает auth.
Backend использует только реальную auth-схему через БД.

## Что остается каноничным

- JWT transport через `HttpOnly` cookies
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- frontend отправляет `credentials: 'include'`
- `GET/POST/PUT/DELETE /api/v1/dashboard/quick-actions` хранит данные in-memory по роли

## Ограничения

- Quick actions сохраняются только в памяти процесса backend и сбрасываются при перезапуске
- Данные CRUD-эндпойнтов берутся из backend источников данных
