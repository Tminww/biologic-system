# Test Checklist

## Mandatory Checks

1. CRUD happy paths for touched entities
2. Validation and error payload checks
3. Role-based access checks for protected endpoints
4. Soft delete behavior verification
5. Pagination and filter correctness

## Quality Commands

```bash
uv run ruff check .
uv run black --check .
uv run mypy --strict app
uv run pytest --cov=app --cov-report=term-missing
```

## Coverage Policy

Maintain total production code coverage in the `90-100%` range.

