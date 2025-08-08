import { env } from "@slash-kit/env";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
		ssl: true,
	},
});

export * as schema from "./schema";
