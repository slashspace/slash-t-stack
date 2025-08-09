## @slash-kit/types

Shared TypeScript types for this monorepo. Centralizes API response shapes and common primitives to keep server and client consistent.

## Install & use

```ts
import type {
  ApiResponse,
  PaginatedResponse,
  ApiError,
  BaseEntity,
  PaginationParams,
} from "@slash-kit/types";
```

## Exports

- `api`: `ApiResponse`, `PaginatedResponse`, `ApiError`
- `common`: `BaseEntity`, `PaginationParams`

## Quick examples

```ts
// Standard response
const ok: ApiResponse<BaseEntity> = {
  success: true,
  data: { id: "1", createdAt: new Date(), updatedAt: new Date() },
  message: "OK",
};

// Paginated response
const list: PaginatedResponse<BaseEntity> = {
  success: true,
  data: [],
  pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
};

// Using pagination params
function toQuery({ page, limit }: PaginationParams) {
  return { limit, offset: (page - 1) * limit };
}
```

## Scripts

```bash
pnpm --filter @slash-kit/types run build
pnpm --filter @slash-kit/types run type-check
pnpm --filter @slash-kit/types run lint
pnpm --filter @slash-kit/types run format
```

## Notes

- Types only; no runtime logic.
- Private package (`private: true`).
