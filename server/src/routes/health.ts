import type { ApiResponse } from "@slash-kit/shared/types";
import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) => {
	const data: ApiResponse = {
		success: true,
		message: "Server is running",
		data: {
			version: "1.0.0",
			timestamp: new Date().toISOString(),
		},
	};
	return c.json(data);
});

export default router;
