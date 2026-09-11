/**
 * Redis/Valkey connection helper. Client setup done for you; the
 * "current state" caching and pub/sub logic is your TODO.
 */

import Redis from "ioredis";
import "dotenv/config";

export const redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379");

// TODO: setCurrentSnapshot(snapshot: ProjectionSnapshot): Promise<void>
// TODO: getCurrentSnapshot(): Promise<ProjectionSnapshot | null>
// TODO: publish an update on a channel (e.g. "snapshot:updated") whenever
// the pipeline recomputes, so the dashboard can subscribe rather than poll.
