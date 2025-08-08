import { pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", (t) => ({
	id: t.text().primaryKey(),
	name: t.text().notNull(),
	email: t.text().notNull().unique(),
	emailVerified: t.boolean().notNull(),
	image: t.text(),
	createdAt: t.timestamp().notNull(),
	updatedAt: t.timestamp().notNull(),
}));
