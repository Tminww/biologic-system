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

## Тестовые пользователи (backend mock)

- `admin` / `admin123`
- `doctor` / `doctor123`
- `tech` / `tech123`

## Ограничения

- Mock только для auth слоя
- Данные CRUD-эндпойнтов по-прежнему берутся из backend источников данных
