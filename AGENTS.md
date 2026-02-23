# Agent Guide (Unified)

Централизованная документация проекта находится в `docs-site/pages`.

Этот файл объединяет правила и спецификации из `backend/AGENTS.md` и `frontend/AGENTS.md`.

## Backend

Единый источник правил работы агента в этом репозитории.
Централизованная документация проекта находится в `docs-site/pages`.

## Назначение

1. Хранить операционные правила агента вне пользовательской документации `docs/`.
2. Поддерживать единый процесс внесения изменений в код, документацию и ADR.
3. Синхронизировать практику разработки с навыками в `.codex/skills/`.

## Область источников

Использовать `docs/` как source of truth для:

1. Архитектуры и слоёв.
2. API-контрактов и ошибок.
3. Инвариантов модели данных.
4. Runbook и пользовательских сценариев.

Использовать `.codex/` для:

1. Навыков агента (`.codex/skills/*`).
2. Вспомогательных внутренних правил.

## Алгоритм работы

### 1. Изучение

1. Прочитать релевантные контракты в `docs/`.
2. Проверить затронутые файлы и зависимости через `rg`/`rg --files`.
3. Определить риски: контракт API, инварианты БД, архитектурные границы, backward compatibility.
4. Выбрать минимально необходимый набор навыков из `.codex/skills/`.
5. Для внешней технической документации сначала использовать Context7, чтобы получать актуальные версии API и примеров.

### 2. Планирование

1. Сформировать список изменений по файлам.
2. Зафиксировать критерии готовности (код, тесты, docs, ADR).
3. Определить, какие проверки обязательны для изменения.
4. Для документации заранее определить целевые страницы и место в `docs-site/zudoku.config.tsx`.

### 3. Внедрение

1. Вносить изменения малыми, проверяемыми шагами.
2. Соблюдать архитектурные границы проекта.
3. Обновлять `docs/` и ADR при изменении контрактов/решений.
4. Для документации соблюдать `md-first`:
   - по умолчанию `*.md`;
   - `*.mdx` только если реально нужен JSX/React.
5. При добавлении новых страниц синхронизировать навигацию в `docs-site/zudoku.config.tsx`.

### 4. Тестирование

1. Запустить целевые проверки для изменённых модулей.
2. Минимальный базовый набор (по необходимости):
   - `uv run ruff check .`
   - `uv run black --check .`
   - `uv run mypy --strict app`
   - `uv run pytest --cov=app --cov-report=term-missing`
3. Для документации запускать:
   - `make docs-build`
   - при локальной проверке UI: `make docs-dev` и/или `make docs-serve`
4. Зафиксировать, что не удалось проверить, если что-то не запускалось.

## Tooling Policy

1. Использовать `rg`/`rg --files` для поиска.
2. Использовать `apply_patch` для точечных правок.
3. Использовать `uv` для Python-команд.
4. Использовать Context7 как основной источник внешней техдокументации.
5. При вопросах по библиотекам/фреймворкам сначала запрашивать актуальную документацию через Context7, и только потом применять изменения в коде.

## Skills

Навыки проекта:

1. `project-architecture-guard`
2. `fastapi-crud-pattern`
3. `testing-standards`
4. `docs-adr-writer`

Принцип: применять минимальный релевантный набор навыков.

## Правила документации

1. Все страницы в `docs/` начинаются с front matter (`icon`, `tags`).
2. Предпочитать portable Markdown (`*.md`).
3. Использовать callouts (`:::tip`, `:::note`, `:::warning`, `:::danger`), таблицы и типизированные code fences.
4. Добавлять Mermaid для архитектурных/процессных страниц.
5. Проверять, что ссылки в `docs-site/zudoku.config.tsx` ведут на существующие файлы.

## Definition of Done

Задача считается завершённой, когда:

1. Код и контракты синхронизированы.
2. Тесты/проверки выполнены на достаточном уровне.
3. Документация и ADR обновлены при необходимости.
4. В финальном отчёте перечислены изменения, проверки и ограничения.

## Frontend

You are Codex. Generate a complete, runnable enterprise Vue 3 starter project based on the specification below.

PROJECT DOCUMENTATION
- Centralized project documentation lives in docs-site/pages.

GOALS
- Build a Vue 3 SPA for internal/admin usage with server-side tables, CRUD dialogs with tabs, RBAC permissions with per-user overrides, optimistic UI with rollback, session-based authentication (Yii2-friendly), and a reusable architecture.
- Output must be production-leaning, clean, minimal-magic, no comments, moderate TypeScript strictness, composables for complex logic, reusable base components.

TECH STACK
- Vue 3 + Vite
- TypeScript (moderate strictness)
- <script setup>
- Pinia
- Vue Router
- PrimeVue 4
- PrimeVue theme: Aura
- PrimeIcons
- PrimeVue Toast + ConfirmDialog (wrap in composables so it can be swapped later)
- REST API client using fetch (or axios) WITH credentials included for session-based auth
- No Tailwind required

THEME REQUIREMENTS
- Use PrimeVue Aura theme
- Provide a single place to customize:
  - primary color
  - component sizes (inputs/buttons spacing/font-size) via preset/CSS variables where feasible
- Keep custom CSS minimal

APP PAGES (MVP)
1) /login
2) /dashboard
3) /entities (example business entity CRUD)
4) /admin/users (admin users CRUD + manage user permissions)

LAYOUT
- AuthLayout for /login
- MainLayout for protected routes: sidebar + topbar + content
- Sidebar always shows all nav items, BUT items can be disabled with lock icon + tooltip if no permission to view
- Even if disabled in sidebar, user must be protected by router guards too

AUTHENTICATION (SESSION-BASED)
- Backend stores session. Frontend sends credentials.
- Endpoints (for integration + mocks):
  POST /auth/login  { email, password }
  POST /auth/logout
  GET  /auth/me     -> returns user + effective permissions

- On app startup, restore session by calling /auth/me before first navigation.

ROUTER GUARDS
- Public route: /login meta.public = true
- Protected routes: meta.requiresAuth = true
- Permission requirement on routes via meta.resource + meta.action
- Global beforeEach:
  - if not initialized -> await auth.restoreSession()
  - if route public -> allow
  - if not authenticated -> redirect /login
  - if route requires permission and !can(resource, action) -> redirect /dashboard
- Add a global API response handler/interceptor:
  - on 401 -> auth.logoutLocal() and redirect /login
  - on 403 -> toast "Недостаточно прав"

PINIA STORES
1) auth.store.ts
- state: user|null, permissions: Permission[], loading, initialized
- getters: isAuthenticated
- actions: login, logout, restoreSession, setSession(user, permissions), clearSession
- method can(resource, action) to check effective permissions
- permissions are considered effective and come from backend (role + overrides already applied)

2) (optional) ui.store.ts for layout state (sidebar collapsed etc.)

PERMISSIONS MODEL (FRONTEND TYPES)
- Permission { resource: 'dashboard'|'entities'|'users'|'roles', action: 'view'|'create'|'edit'|'delete' }
- UI rule: do not hide; disable with lock + tooltip

REUSABLE PERMISSION HELPERS
- usePermission composable reading from auth store:
  - can(resource, action): boolean
- v-permission directive (optional but preferred):
  - Usage: <Button v-permission="['users','delete']" ... />
  - Behavior: if cannot -> disabled=true, add lock icon (or show lock next to label), add tooltip

BASE COMPONENTS (REUSABLE)
A) BaseTable.vue
- Wrap PrimeVue DataTable for server-side usage
- Props:
  - columns: TableColumn[]
  - data: any[]
  - total: number
  - loading: boolean
  - filters: TableFilters
  - readOnly?: boolean
- Emits:
  - page, sort, filter, refresh
- Features:
  - paginator (rows configurable)
  - sorting (single)
  - global search input
  - column filters based on column definition
  - complex filters: date range, multi-select (implement at least one date range filter and one multi-select example)
  - filter presets: save/apply/delete in localStorage, keyed per page/module
- Slots:
  - #actions="{ row }" for row action buttons

B) BaseDialog.vue
- Wrap PrimeVue Dialog
- Props:
  - visible: boolean
  - mode: 'view'|'edit'|'create'
  - title: string
  - loading?: boolean
  - readOnly?: boolean
- Emits: close, save, edit
- Layout: TabView via slot
- Slots:
  - #tabs (contains TabPanel blocks)
  - #footer (optional)

C) ConfirmDelete.vue (or composable)
- Provide confirm dialog wrapper function for delete actions

COMPOSABLES
1) useServerTable<T>(apiFn, options)
- Maintains:
  - data, total, loading
  - pagination { page, size }
  - sorting { field, order }
  - filters (global + columns)
  - presets persistence (localStorage, scoped key)
- Implements:
  - fetch()
  - refresh()
  - debounced global search
  - serialize filters/sort to REST params
- Must work with BaseTable events

2) useCrudDialog<T>()
- Manages:
  - visible, mode, selected item
  - methods: openView(row), openEdit(row), openCreate(), close()
- Integrate permission checks:
  - openEdit: if no edit permission -> openView instead
- Provide computed readOnly for dialog:
  - mode==='view' || !can(resource,'edit')

3) useOptimistic<T>()
- Provide optimistic apply + rollback patterns for update/delete
- Should support:
  - update item in list
  - remove item from list
  - rollback snapshot
- Consistency check with updatedAt:
  - When saving, include updatedAt
  - If backend returns 409 STALE_DATA, show toast and refresh table

4) useToast()
- Simple wrapper around PrimeVue toast usage

API LAYER
- Create a minimal api client:
  - base URL config
  - credentials included
  - JSON parsing
  - unify error shape { status, code, message }
- Create module API files:
  - auth.api.ts
  - entities.api.ts
  - admin.api.ts (users + permissions)

DATA CONTRACTS (FRONTEND EXPECTATIONS)
- All list endpoints return:
  { data: [...], meta: { total: number } }
- Entities include updatedAt ISO string

ENTITIES MODULE (/entities)
- Page contains:
  - BaseTable wired to useServerTable
  - Row actions: view, edit, delete
    - view always allowed if can(view)
    - edit disabled if cannot edit
    - delete disabled if cannot delete, delete requires confirm dialog
  - A button "Create" disabled if cannot create
- Dialog:
  - Uses BaseDialog + useCrudDialog
  - Tabs:
    - Details tab always
    - Optional second tab "Relations" (placeholder)
  - View mode default; Edit mode via button (if permitted)
  - Use PrimeVue Form + native validation (required fields)
- Optimistic:
  - On save/update: apply optimistic update to table list if feasible; otherwise refresh
  - On delete: optimistic remove + rollback on error

ADMIN USERS MODULE (/admin/users)
- Server-side users table (BaseTable + useServerTable)
- CRUD for users:
  - create user
  - edit user (role, status)
  - delete user (optional, can omit if not needed)
- Manage permissions:
  - Action button "Permissions" opens a dialog with tabs:
    - General tab (role, status)
    - Permissions tab (matrix)
- Permission matrix UX:
  - Group by resource (Accordion)
  - Actions per resource (view/create/edit/delete)
  - Three states per action:
    - inherited from role
    - override allow
    - override deny
  - Must clearly show which state it is (badge/label)
  - Ability to reset override back to inherited
- API integration:
  GET /admin/users/{id}/permissions returns:
    { data: { rolePermissions: Permission[], overrides: {resource,action,allowed}[] } }
  PUT /admin/users/{id}/permissions with:
    { overrides: [{resource,action,allowed}] }
  - After saving, update auth store permissions if the edited user is the current user (optional but preferred)

ROLES + OVERRIDES MODEL (BACKEND-DRIVEN)
- Backend is responsible for computing effective permissions for /auth/me
- Overrides always take precedence over role permissions

BACKEND SPEC (DOCUMENTATION + MOCK)
- Include a docs/ folder with a markdown spec for Yii2 endpoints:
  - /auth/login, /auth/me, /auth/logout
  - /entities CRUD with page/size, sort, filters
  - /admin/users CRUD
  - /admin/users/{id}/permissions GET/PUT
  - error codes: 401, 403, 409, 422
- Include a dev-only mock server OR mocked API module:
  - Provide fake data to run frontend without backend:
    - login works for at least 2 users: admin and viewer
    - permissions differ per role
    - entities list supports pagination and filtering (in-memory)

CODE ORGANIZATION (REQUIRED)
Use this structure (or extremely close):
src/
  app/
    main.ts
    router.ts
  layouts/
    AuthLayout.vue
    MainLayout.vue
  modules/
    auth/
      LoginPage.vue
      auth.store.ts
      auth.api.ts
    dashboard/
      DashboardPage.vue
    entities/
      EntitiesPage.vue
      EntityDialog.vue
      entities.api.ts
      useEntities.ts (optional module composable)
    admin/
      UsersPage.vue
      UserDialog.vue
      PermissionsTab.vue
      PermissionMatrix.vue
      admin.api.ts
  shared/
    components/
      BaseTable.vue
      BaseDialog.vue
      ConfirmDelete.ts (or .vue)
    composables/
      useServerTable.ts
      useCrudDialog.ts
      useOptimistic.ts
      usePermission.ts
      useToast.ts
    types/
      api.ts
      permissions.ts
    ui/
      prime.config.ts
  styles/
    theme.css (or prime overrides)

NON-FUNCTIONAL
- No comments in code
- Minimal magic
- Prefer explicit props/events
- Keep components small
- Reuse BaseTable/BaseDialog across modules
- Provide README with:
  - install/run steps
  - how to configure API base URL
  - how permissions work
  - how to add a new CRUD module using BaseTable/BaseDialog/composables

DELIVERABLE
- Output all necessary files for a working project.
- Ensure the project builds and runs.
- Provide mock mode by default so /login and pages work without backend.
- Use PrimeVue components consistently and Aura theme.
- Ensure sidebar lock/disabled behavior is implemented.
- Ensure router guards + restore session works in mock mode.

Generate the full codebase now.
