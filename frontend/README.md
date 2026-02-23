# Biologic System

Enterprise Vue 3 SPA starter for internal/admin tooling with session-based auth, RBAC, server-side tables, and CRUD dialogs.

## Getting Started

```bash
npm install
npm run dev
```

## Documentation (VitePress)

```bash
npx vitepress dev docs
```

Build docs:

```bash
npx vitepress build docs
```

Preview docs:

```bash
npx vitepress preview docs
```

Key docs:

- `docs/index.md` - docs entry point
- `docs/project/current-state.md` - current implementation status and route/module coverage
- `docs/api/overview.md` - API integration contracts

## E2E Tests

```bash
npm run test:e2e
```

## Configuration

- `VITE_API_BASE_URL` (default: empty string)
  - Example: `https://api.example.com`
- `VITE_API_PREFIX` (default: `/api/v1`)
- `VITE_API_REQUEST_CASE` (default: `snake`)
- `VITE_API_SUPPORTS_FILTERS` (`true|false`)
- Locale: stored in `localStorage` as `app_locale` (`ru` default, `en` available).

## Permissions

- Effective permissions are provided by `/auth/me` and already include role + overrides.
- UI never hides items; it disables them with a lock icon and tooltip.
- Route guards enforce permissions even when an item appears in the sidebar.

## URL Anchors

Use URL hashes to open dialogs or the filters panel programmatically.

- Create dialog: `/objects#create`
- Edit dialog: `/objects#edit=123`
- View dialog: `/objects#view=123`
- Filters panel: `/objects#filters`
- Filters panel with preset: `/objects#filters=My%20Preset`
- Legacy dialog hashes still work: `/objects#edit-123`, `/objects#edit:123`

## Backend Mock Auth Mode

Frontend does not contain local API/auth mocks.  
For demo auth via backend JWT cookies, run backend with `APP_AUTH_MODE=mock` and use:

- `admin` / `admin123`
- `doctor` / `doctor123`
- `tech` / `tech123`

## Adding a New CRUD Module

1. Create an API module in `src/modules/<module>/<module>.api.ts` using the shared API client.
2. Build a page with `BaseTable` + `useServerTable` and provide presets via `TABLE_PRESETS_KEY`.
3. Keep `Refresh` on the right; the rightmost action is `Create`. If the page has extra actions, use a `SplitButton` with `Create` as the main action and put extras in the dropdown.
4. Create a dialog using `BaseDialog` + `useCrudDialog`.
5. Use `useOptimistic` for update/delete and `useConfirmDelete` for destructive actions.
6. Add a route with `meta.resource` and `meta.action` plus a sidebar entry in `MainLayout`.

## Custom Theme

Edit CSS variables in `src/styles/theme.css`:
- `--p-primary-500` (primary color)
- `--p-input-padding-*`, `--p-button-padding-*`, `--p-font-size` (component sizing)

## Docs

- API spec: `docs/api-spec.md`
