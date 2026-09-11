/**
 * The orchestration loop — ties everything together. This is the
 * backend equivalent of Ridgeline's WebSocket handler: the piece that
 * makes the rest of your code actually run end to end.
 *
 * TODO:
 *   1. On each tick, get the next simulated actuals (simulator.ts).
 *   2. Persist them (db.ts).
 *   3. Recompute revenue/burn/runway and check for drift
 *      (@signal-drift/finance).
 *   4. Update the current snapshot and publish it (cache.ts).
 *
 * Decide deliberately how often this runs and how it's triggered — a
 * setInterval for this simulator is fine, just be explicit about why.
 */

export function startPipeline(): void {
  throw new Error("startPipeline not implemented yet");
}
