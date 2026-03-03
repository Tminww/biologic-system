# Быстрый старт

## Требования

- Node.js 18+
- npm 9+

## Установка и запуск приложения

```bash
npm install
npm run dev
```

Приложение всегда работает через backend API.

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

- `VITE_API_BASE_URL`
  - базовый URL backend
- `VITE_API_PREFIX`
  - префикс API (по умолчанию `/api/v1`)
- `VITE_API_REQUEST_CASE`
  - `snake` (по умолчанию): ключи `params`/`body` конвертируются в `snake_case`
  - `none`: без автоматической конвертации ключей
- `VITE_API_SUPPORTS_FILTERS`
  - `false`: `useServerTable` не отправляет `filters/global`
  - `true`: отправляются `filters/global` для расширенной фильтрации

Пример `.env` для живого backend:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_API_PREFIX=/api/v1
VITE_API_REQUEST_CASE=snake
VITE_API_SUPPORTS_FILTERS=false
```

## Тесты

```bash
npm run test:e2e
```

## Тестовые учетные записи backend

После `alembic upgrade head` доступен пользователь:

- `admin` / `admin123`

## Важные локальные ключи

- `app_locale` (`ru` или `en`)
- `app_theme` (`light` или `dark`)
- `table-presets:<route>` или явный `presetKey` модуля
