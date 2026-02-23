# CRUD Contract

## Endpoint Set

1. `POST /api/v1/{resource}`
2. `GET /api/v1/{resource}/{id}`
3. `GET /api/v1/{resource}`
4. `PATCH /api/v1/{resource}/{id}`
5. `DELETE /api/v1/{resource}/{id}`

## List Query Parameters

1. `offset` default `0`
2. `limit` default `15`, max `500`
3. `sort_by`
4. `sort_order` as `asc` or `desc`
5. field filters as exact match query params
6. interval filters as `{field}_from` and `{field}_to`

## List Response

```json
{
  "items": [],
  "meta": {
    "total": 0,
    "offset": 0,
    "limit": 15
  }
}
```

## Delete Rule

`DELETE` sets `deleted_at` and never physically removes records in v1.

## Error Rule

Return errors as `application/problem+json` (`RFC 9457`).

