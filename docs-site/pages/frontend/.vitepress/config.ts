import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ru-RU',
  title: 'Biologic System',
  description: 'Техническая документация проекта',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Старт', link: '/getting-started' },
      { text: 'Состояние', link: '/project/current-state' },
      { text: 'Архитектура', link: '/architecture/overview' },
      { text: 'Модули', link: '/modules/overview' },
      { text: 'API', link: '/api/overview' },
      { text: 'Гайды', link: '/guides/add-crud-module' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: 'На странице'
    },
    sidebar: [
      {
        text: 'Введение',
        items: [
          { text: 'Обзор', link: '/' },
          { text: 'Быстрый старт', link: '/getting-started' },
          { text: 'Актуальное состояние', link: '/project/current-state' }
        ]
      },
      {
        text: 'Архитектура',
        items: [
          { text: 'Общий обзор', link: '/architecture/overview' },
          { text: 'Структура проекта', link: '/architecture/project-structure' },
          { text: 'Роутинг и Guards', link: '/architecture/router-and-guards' },
          { text: 'Auth и RBAC', link: '/architecture/auth-and-permissions' }
        ]
      },
      {
        text: 'UI и Composables',
        items: [
          { text: 'Базовые компоненты', link: '/ui/base-components' },
          { text: 'Ключевые composables', link: '/composables/core-composables' }
        ]
      },
      {
        text: 'Бизнес-модули',
        items: [
          { text: 'Карта модулей', link: '/modules/overview' },
          { text: 'Объекты', link: '/modules/objects' },
          { text: 'Пользователи (admin)', link: '/modules/admin-users' },
          { text: 'Роли и права', link: '/modules/roles-and-permissions' },
          { text: 'Остальные каталоги', link: '/modules/catalog-modules' }
        ]
      },
      {
        text: 'Интеграция и эксплуатация',
        items: [
          { text: 'API контракт', link: '/api/overview' },
          { text: 'OpenAPI 3.1 (FastAPI)', link: '/api/openapi-fastapi' },
          { text: 'Контракты modules/*.api.ts', link: '/api/modules-contracts' },
          { text: 'Mock server', link: '/mock/mock-server' },
          { text: 'E2E тестирование', link: '/testing/e2e' },
          { text: 'Как добавить CRUD модуль', link: '/guides/add-crud-module' },
          { text: 'Troubleshooting', link: '/operations/troubleshooting' }
        ]
      }
    ]
  }
})
