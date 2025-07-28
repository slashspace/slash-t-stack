import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import demoRouter from "./routes/demo";

const app = new Hono();

app.use(cors());

// routes
app.route("/api", demoRouter);

// health check
app.get("/health", (c) => {
	return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

const server = serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.group();
		console.log(`🚀 Server is running on port ${info.port}`);
		console.log(`📡 API: http://localhost:${info.port}/api`);
		console.log(`💚 Health: http://localhost:${info.port}/health`);
		console.groupEnd();
	},
);

// graceful shutdown
process.on("SIGINT", () => {
	server.close();
	process.exit(0);
});
process.on("SIGTERM", () => {
	server.close((err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		process.exit(0);
	});
});

export default app;
