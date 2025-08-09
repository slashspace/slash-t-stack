## @slash-kit/db

This package contains the database schema and tooling for migrations using Drizzle Kit. It follows a migration-first workflow suitable for team collaboration and CI/CD.

- **Docs reference**: See the official Drizzle Kit overview for full details: [Drizzle Kit Overview](https://orm.drizzle.team/docs/kit-overview)

### Repository layout

- **Schema**: `./src/schema/**` (e.g., `./src/schema/user.ts`)
- **Config**: `./drizzle.config.ts`
- **Migrations output**: `./drizzle`
- **Connection**: `DATABASE_URL` provided via `@slash-kit/env`

### Configuration (drizzle.config.ts)

This project uses PostgreSQL. Migrations are generated to `./drizzle` from the TypeScript schema under `./src/schema`.

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema/**/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    // Provide DATABASE_URL via environment when running drizzle-kit
    url: process.env.DATABASE_URL!,
  },
});
```

> [!NOTE]
> - Use a glob like `./src/schema/**/*.ts` to avoid missing new files.
> - Never hardcode credentials; always read from env (`DATABASE_URL`).

### NPM scripts

Scripts are defined here and are intended to be run from the workspace root using pnpm. Either change directory or use filters.

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:pull": "drizzle-kit pull",
    "db:check": "drizzle-kit check",
    "db:up": "drizzle-kit up",
    "db:studio": "drizzle-kit studio"
  }
}
```

Run examples from repo root:

```bash
# Change directory
pnpm -C packages/db db:generate
pnpm -C packages/db db:migrate

# Or filter by package name
pnpm --filter @slash-kit/db db:generate
pnpm --filter @slash-kit/db db:migrate
```

### Recommended workflow (best practice)

> [!IMPORTANT]
> Why this flow?
> - Keeps changes auditable and reviewable, which is critical for teams and production safety.

1. **Edit schema** under `packages/db/src/schema/**`.
2. **Generate SQL**: `pnpm -C packages/db db:generate`.
3. **Review SQL** under `packages/db/drizzle` (ensure changes are expected). 
4. **Apply migrations**: `pnpm -C packages/db db:migrate` (against your current `DATABASE_URL`).
5. **Commit both** the TypeScript schema and generated SQL migrations.



### Multi-environment support

Use multiple config files and select via `--config` for dev/staging/prod or multiple databases.

```bash
# Example commands
pnpm -C packages/db drizzle-kit generate --config=drizzle.dev.config.ts
pnpm -C packages/db drizzle-kit migrate  --config=drizzle.prod.config.ts
```

> [!TIP]
> - Store per-environment `DATABASE_URL` securely.
> - Use distinct `out` directories if maintaining separate migration tracks per database.

### Drizzle Studio

Start Studio to browse your database:

```bash
pnpm -C packages/db db:studio
```

Recommendation:
- Use only for local development against non-production data.

### CI/CD recommendations

- **Check for conflicts** before merging: `pnpm -C packages/db db:check`.
- **Run migrations** in CI for test/Staging: `pnpm -C packages/db db:migrate`.
- **Avoid `push` in production**; prefer the audited "generate + migrate" flow.
- Commit the `./drizzle` migration files to version control.

### Common pitfalls

- **Forgetting to commit migrations**: always commit the generated SQL with schema changes.
- **Using `push` on prod**: `push` bypasses SQL files; use it only for quick local prototyping.
- **Schema glob too narrow**: use `./src/schema/**/*.ts` if you split schemas across many files.

### Quick commands

```bash
# Generate + migrate (local)
pnpm -C packages/db db:generate && pnpm -C packages/db db:migrate

# Check conflicts
pnpm -C packages/db db:check

# Studio
pnpm -C packages/db db:studio
```

### Further reading

- Drizzle Kit overview and all commands: [Drizzle Kit Overview](https://orm.drizzle.team/docs/kit-overview)

