import { db, schema } from "@slash-kit/db";
import { Hono } from "hono";

const router = new Hono();

router.get("/", async (c) => {
	const users = await db.select().from(schema.user);
	return c.json(users);
});

export default router;
