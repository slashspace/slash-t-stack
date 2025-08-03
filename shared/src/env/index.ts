import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
		PORT: z.coerce.number().default(3000),
		HOST: z.coerce.string().default("localhost"),

		// Database
		DATABASE_URL: z.coerce.string(),

		// API Keys (optional for development)
		API_KEY: z.coerce.string().optional(),

		// Feature flags
		ENABLE_LOGGING: z.coerce.boolean().default(true),
		ENABLE_CACHE: z.coerce.boolean().default(false),
	},
	clientPrefix: "PUBLIC_",
	client: {
		// Client-side environment variables (if any)
		PUBLIC_API_URL: z.coerce.string().optional(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

// Type exports for use in other packages
export type Env = typeof env;
