---
name: docs-adr-writer
description: Maintain project documentation consistency across Zudoku pages and Architecture Decision Records. Use when architecture, API contracts, quality standards, operational behavior, or data model rules are introduced or changed.
---

# Docs ADR Writer

Keep docs and decisions synchronized with implementation intent.

## Workflow

1. Identify what changed: architecture, API, data model, or operations.
2. Update relevant pages in `docs/`.
3. Follow `md-first`: create/update `*.md` by default; use `*.mdx` only when React/JSX is required.
4. Add or update ADR when the change affects long-term architecture.
5. Verify `docs-site/zudoku.config.tsx` navigation still points to existing files.
6. Apply supported Zudoku Markdown features for structure and readability.
7. Ensure each updated page starts with front matter (`icon`, `tags`).
8. Run docs build check when docs structure or navigation changed.

## ADR Policy

Create a new ADR when:

1. Dependency rules change
2. API contract changes
3. Error format or auth strategy changes
4. Data model invariants change

ADR file naming: `ADR-XXXX-short-title.md`.

## Output Rules

1. Prefer concise diffs with exact file references.
2. State what was changed and why.
3. Never leave broken nav links in `docs-site/zudoku.config.tsx`.
4. Use Context7 as the primary source when searching external technical documentation.
5. Use other sources only as fallback when Context7 lacks required details.
6. Prefer portable Markdown (`*.md`) with callouts (`:::note`, `:::tip`, `:::warning`), tables, typed code fences, and Mermaid blocks.
7. Use `npm --prefix docs-site run build` to validate doc build for navigation/content changes.

## Reference

Always load `references/doc-map.md` before editing documentation.
Always load `references/markdown-writing-rules.md` before writing new documentation pages.
