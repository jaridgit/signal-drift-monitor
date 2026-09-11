/**
 * API entrypoint: health check + (eventually) the endpoints the
 * dashboard polls or subscribes to.
 *
 * The Fastify setup and health check are real and runnable as-is —
 * start here to confirm your environment works before touching the
 * simulator/pipeline logic.
 */

import Fastify from "fastify";
import "dotenv/config";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok" };
});

// TODO: an endpoint (or SSE/WebSocket stream) that returns the current
// ProjectionSnapshot from `cache.ts`, for the dashboard to consume.

const port = Number(process.env.PORT ?? 8080);
app.listen({ port }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
