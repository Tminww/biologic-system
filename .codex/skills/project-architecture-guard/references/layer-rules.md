# Layer Rules

## Allowed Imports

1. `app/api` -> `app/services`, `app/schemas`, `app/api/dependencies`
2. `app/services` -> `app/repositories`, `app/models`, `app/core/errors`
3. `app/repositories` -> `app/models`, `app/core/database`
4. `app/core` -> no dependency on `app/api` or `app/services`

## Forbidden Patterns

1. `app/api` importing repository classes directly
2. `app/repositories` importing FastAPI modules
3. Service layer returning ORM entities as API response models
4. Blocking I/O in async request path

## Required Composition Rules

1. Register routers and handlers in `create_app`.
2. Register global error handlers in one place.
3. Define dependency providers in shared dependency modules.

