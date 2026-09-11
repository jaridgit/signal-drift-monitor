/**
 * The financial formulas — the mathematical core of the whole project,
 * and the part the take-home brief specifically calls out. Nothing here
 * is implemented on purpose: get these right, tested, and provably
 * correct before anything else in the monorepo depends on them.
 */

import type { Driver, PlannedValue, ActualValue, DriftFlag } from "@signal-drift/types";

/**
 * TODO: sum a period's actual driver values into a revenue figure.
 * Decide which drivers count as revenue-generating (e.g. new customers
 * * average deal size) vs. cost drivers (e.g. headcount, burn) — that
 * distinction is a design decision you should make deliberately, not
 * hardcode by accident.
 */
export function calculateRevenue(
  drivers: Driver[],
  actuals: ActualValue[],
  period: string
): number {
  throw new Error("calculateRevenue not implemented yet");
}

/**
 * TODO: revenue minus costs for a period. Net-negative means burning
 * cash; net-positive means profitable that period.
 */
export function calculateNetBurn(
  drivers: Driver[],
  actuals: ActualValue[],
  period: string
): number {
  throw new Error("calculateNetBurn not implemented yet");
}

/**
 * TODO: given current cash on hand and a net burn rate, how many months
 * until it runs out? Handle the edge case where net burn is zero or
 * positive (i.e. runway is effectively infinite) explicitly rather than
 * dividing by zero or returning something misleading.
 */
export function calculateRunwayMonths(cashOnHand: number, netBurn: number): number {
  throw new Error("calculateRunwayMonths not implemented yet");
}

/**
 * TODO: compare a planned value against a rolling window of actuals for
 * the same driver, and decide whether it counts as drift. A single
 * off-target period usually shouldn't trigger "critical" — think about
 * what a sensible rolling-window deviation threshold looks like, and
 * make severity ("none" | "warning" | "critical") a real judgment call,
 * not just two arbitrary cutoffs.
 */
export function detectDrift(
  planned: PlannedValue,
  recentActuals: ActualValue[]
): DriftFlag | null {
  throw new Error("detectDrift not implemented yet");
}
