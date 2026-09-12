/**
 * The financial formulas — the mathematical core of the whole project,
 * and the part the take-home brief specifically calls out. Nothing here
 * is implemented on purpose: get these right, tested, and provably
 * correct before anything else in the monorepo depends on them.
 */

import type { Driver, PlannedValue, ActualValue, DriftFlag } from "@signal-drift/types";

/**
 * Sums a period's actual values across every driver tagged
 * `kind: "revenue"`, ignoring cost drivers (e.g. headcount, burn).
 */
export function calculateRevenue(
  drivers: Driver[],
  actuals: ActualValue[],
  period: string
): number {
  const revenueDriverIds = new Set(
    drivers.filter((driver) => driver.kind === "revenue").map((driver) => driver.id)
  );

  return actuals
    .filter((actual) => actual.period === period && revenueDriverIds.has(actual.driverId))
    .reduce((total, actual) => total + actual.value, 0);
}

/**
 * Revenue minus costs for a period. Net-negative means burning cash;
 * net-positive means profitable that period.
 */
export function calculateNetBurn(
  drivers: Driver[],
  actuals: ActualValue[],
  period: string
): number {
  const costDriverIds = new Set(
    drivers.filter((driver) => driver.kind === "cost").map((driver) => driver.id)
  );

  const costs = actuals
    .filter((actual) => actual.period === period && costDriverIds.has(actual.driverId))
    .reduce((total, actual) => total + actual.value, 0);

  return calculateRevenue(drivers, actuals, period) - costs;
}

/**
 * Months of cash left at the current burn rate. Zero or positive net
 * burn means spending isn't exceeding income, so runway is treated as
 * infinite rather than dividing by zero.
 */
export function calculateRunwayMonths(cashOnHand: number, netBurn: number): number {
  if (netBurn >= 0) {
    return Infinity;
  }

  return cashOnHand / -netBurn;
}

/**
 * Compares a planned value against the average of a rolling window of
 * recent actuals (not just the latest one) so a single noisy period
 * doesn't swing the severity. Deviation under 10% is ignored, 10-25% is
 * a warning, anything higher is critical — a deliberate, if arbitrary,
 * threshold choice.
 */
export function detectDrift(
  planned: PlannedValue,
  recentActuals: ActualValue[]
): DriftFlag | null {
  const matchingActuals = recentActuals.filter((actual) => actual.driverId === planned.driverId);

  if (matchingActuals.length === 0) {
    return null;
  }

  const averageActual =
    matchingActuals.reduce((total, actual) => total + actual.value, 0) / matchingActuals.length;

  const deviationPct = ((averageActual - planned.value) / planned.value) * 100;
  const absDeviationPct = Math.abs(deviationPct);

  let severity: DriftFlag["severity"];
  if (absDeviationPct < 10) {
    severity = "none";
  } else if (absDeviationPct < 25) {
    severity = "warning";
  } else {
    severity = "critical";
  }

  if (severity === "none") {
    return null;
  }

  return {
    driverId: planned.driverId,
    period: planned.period,
    plannedValue: planned.value,
    actualValue: averageActual,
    deviationPct,
    severity,
    detectedAt: new Date().toISOString(),
  };
}
