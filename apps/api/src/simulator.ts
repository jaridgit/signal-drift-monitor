/**
 * Actuals simulator — generates a stream of "what actually happened"
 * data for each driver, some of it drifting from plan by design.
 *
 * TODO: implement a function that, given a list of Drivers and their
 * PlannedValues, produces ActualValue entries over time — most tracking
 * the plan closely with realistic noise, at least one drifting
 * meaningfully (e.g. new-customer signups falling behind plan, or churn
 * creeping up) so `detectDrift` in packages/finance has something real
 * to catch.
 */

import type { Driver, PlannedValue, ActualValue } from "@signal-drift/types";

export function generateActual(
  driver: Driver,
  plan: PlannedValue,
  driftActive: boolean
): ActualValue {
  throw new Error("generateActual not implemented yet");
}

// TODO: a loop/interval (or a generator) that calls generateActual on a
// schedule for every tracked driver and feeds the results into the
// pipeline below.
