# Быстрый старт

## Требования

- Node.js 18+
- npm 9+

## Установка и запуск приложения

```bash
npm install
npm run dev
```

По умолчанию приложение запускается в mock-режиме.

## Запуск VitePress документации

Минимальный вариант без добавления зависимостей в `package.json`:

```bash
npx vitepress dev docs
```

Сборка документации:

```bash
npx vitepress build docs
```

Локальный предпросмотр сборки:

```bash
npx vitepress preview docs
```

## Переменные окружения

- `VITE_API_MODE`
  - `mock` (по умолчанию): запросы идут в локальный mock API
  - `live`: запросы идут на реальный backend
- `VITE_API_BASE_URL`
  - базовый URL backend, используется в `live` режиме
- `VITE_API_PREFIX`
  - префикс API (по умолчанию `/api/v1`)
- `VITE_API_REQUEST_CASE`
  - `snake` (по умолчанию для `live`): ключи `params`/`body` конвертируются в `snake_case`
  - `none`: без автоматической конвертации ключей
- `VITE_API_SUPPORTS_FILTERS`
  - `false` (по умолчанию для `live`): `useServerTable` не отправляет `filters/global`
  - `true` (по умолчанию для `mock`): отправляются `filters/global` для расширенной фильтрации

Пример `.env` для живого backend:

```env
VITE_API_MODE=live
VITE_API_BASE_URL=https://api.example.com
VITE_API_PREFIX=/api/v1
VITE_API_REQUEST_CASE=snake
VITE_API_SUPPORTS_FILTERS=false
```

## Тесты

```bash
npm run test:e2e
```

## Тестовые учетные записи (mock)

- `admin` / `admin123`
- `doctor` / `doctor123`
- `tech` / `tech123`

## Важные локальные ключи

- `app_locale` (`ru` или `en`)
- `app_theme` (`light` или `dark`)
- `table-presets:<route>` или явный `presetKey` модуля
- mock-ключи (`mock_users_v3`, `mock_objects_v3`, `mock_overrides_v3` и др.)
