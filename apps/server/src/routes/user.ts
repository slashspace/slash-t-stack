import { db } from "@slash-kit/db/client";
import { user } from "@slash-kit/db/schema";
import { Hono } from "hono";

const router = new Hono();

router.get("/", async (c) => {
	const users = await db.select().from(user);
	return c.json(users);
});

export default router;
