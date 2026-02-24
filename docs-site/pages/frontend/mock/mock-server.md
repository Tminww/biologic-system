---
icon: lucide/flask-conical
tags:
  - Frontend
  - Mock
---

# Backend Mock Auth

Frontend не содержит локального mock API и не мокает auth.

## Где включается

Backend (`src/core/config.py`):

- `APP_AUTH_MODE=mock`

## Что остается каноничным

- JWT transport через `HttpOnly` cookies
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- frontend отправляет `credentials: 'include'`
- `GET/POST/PUT/DELETE /api/v1/dashboard/quick-actions` в mock режиме с хранением in-memory по роли

## Тестовые пользователи (backend mock)

- `admin` / `admin123`
- `doctor` / `doctor123`
- `tech` / `tech123`

## Ограничения

- Mock только для auth слоя
- Quick actions сохраняются только в памяти процесса backend и сбрасываются при перезапуске
- Данные CRUD-эндпойнтов по-прежнему берутся из backend источников данных
