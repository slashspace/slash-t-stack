## @slash-kit/env

Lightweight, type-safe environment variable parsing for the monorepo, powered by `@t3-oss/env-core` and `zod`.

- **Package**: `@slash-kit/env`
- **Scope**: Runtime-safe env validation + inferred types
- **Runtime**: Node.js (server) with optional client-prefixed vars

## Install & use

Inside this monorepo, import and use directly:

```ts
import { env } from "@slash-kit/env";

console.log(env.NODE_ENV); // "development" | "production" | "test"
console.log(env.PORT); // number
```

## Defined variables

Server-side (`process.env`):
- `NODE_ENV`: one of `development` | `production` | `test` (default: `development`)
- `PORT`: number (default: 3000)
- `HOST`: string (default: "localhost")
- `DATABASE_URL`: string (required)
- `API_KEY`: string (optional)
- `ENABLE_LOGGING`: boolean (default: true)
- `ENABLE_CACHE`: boolean (default: false)

Client-side (must start with `PUBLIC_`):
- `PUBLIC_API_URL`: string (optional)

Prefix for client variables: `PUBLIC_`

## Example .env

```env
NODE_ENV=development
PORT=3000
HOST=localhost
DATABASE_URL=postgres://user:pass@localhost:5432/db
API_KEY=
ENABLE_LOGGING=true
ENABLE_CACHE=false
PUBLIC_API_URL=http://localhost:3000
```

## Types

```ts
import type { Env } from "@slash-kit/env";
// Env is the inferred type of the validated env object
```

## Scripts

```bash
pnpm --filter @slash-kit/env run build
pnpm --filter @slash-kit/env run type-check
pnpm --filter @slash-kit/env run lint
pnpm --filter @slash-kit/env run format
```

## Notes

- Uses `@t3-oss/env-core` for validation and `zod` schemas under the hood.
- `emptyStringAsUndefined: true` is enabled; empty strings are treated as `undefined`.
- Client variables must be prefixed with `PUBLIC_` to be exposed.
