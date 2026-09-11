/**
 * The dashboard — driver cards showing plan vs. actual, a live drift
 * banner, and (ideally) an explanation of what a drifted driver means
 * for runway, not just that it changed.
 *
 * TODO: fetch/subscribe to the current ProjectionSnapshot from the API
 * (see apps/api/src/cache.ts) and render it via <DriverCard /> — see
 * components/DriverCard.tsx.
 */
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Signal Drift Monitor</h1>
      <p className="text-gray-500 mt-2">
        TODO: driver cards + live drift banner go here.
      </p>
    </main>
  );
}
