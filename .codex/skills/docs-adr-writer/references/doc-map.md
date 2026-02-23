# Documentation Map

## Primary Pages

1. `docs/index.md`
2. `docs/architecture.md`
3. `docs/data-model.md`
4. `docs/api-guidelines.md`
5. `docs/coding-standards.md`
6. `docs/testing-strategy.md`
7. `docs/seeding.md`
8. `docs/runbook.md`
9. `docs/adr/index.md`
10. `docs/documentation-rules.md`
11. `docs/DOCS_STYLEGUIDE.md`

## ADR Scope

Create or update ADR if a decision changes:

1. Layer dependency rules
2. API response or filtering contracts
3. Error format standards
4. Data model invariants (UUID, soft delete, timestamps)

## Format Rule

Keep documentation `md-first`: use `*.md` by default and `*.mdx` only when JSX/React is required.

## Navigation Rule

Keep `docs-site/zudoku.config.tsx` synchronized with existing files in `docs/`.

## Agent Documentation Research Rule

1. Use Context7 first for external technical documentation lookup.
2. Fall back to other sources only when Context7 is insufficient.

## Agent Markdown Rule

When writing or updating documentation, apply the Markdown extension patterns from `references/markdown-writing-rules.md`.
