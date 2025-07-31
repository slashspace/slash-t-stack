import { serve } from "@hono/node-server";
import { env } from "@shared/env";
import { Hono } from "hono";
import { cors } from "hono/cors";
import demoRouter from "./routes/demo";
import healthRouter from "./routes/health";

const app = new Hono();
app.use(cors());

// routes
app.route("/api", demoRouter);
app.route("/health", healthRouter);

const server = serve(
	{
		fetch: app.fetch,
		port: env.PORT,
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
