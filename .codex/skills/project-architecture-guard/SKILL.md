---
name: project-architecture-guard
description: Guard FastAPI project architecture boundaries, dependency direction, DI usage, and async patterns. Use when creating or reviewing modules in app/api, app/services, app/repositories, app/core, app/models, and app/schemas, or when refactoring code that may break layer rules.
---

# Project Architecture Guard

Enforce architectural consistency for the laboratory backend.

## Workflow

1. Identify touched files and map each file to its layer.
2. Validate dependency direction using `references/layer-rules.md`.
3. Check `Depends` usage, app factory usage, and centralized error handlers.
4. Check async safety: no blocking operations in route/service/repository code paths.
5. Report violations with file paths and concrete change guidance.

## Required Rules

1. API layer must not call repositories directly.
2. Services must not import FastAPI request/response objects.
3. Repositories must not import service or API modules.
4. ORM models must not be returned directly from API endpoints.
5. `create_app` factory must remain the composition root for handlers and routers.

## Output Format

Return findings ordered by severity:

1. Critical boundary violations
2. DI and async safety issues
3. Structural inconsistencies
4. Optional improvements

Include exact file references for each finding.

## Reference

Always load `references/layer-rules.md` before giving recommendations.
