/**
 * Shared types — the contract every app in this monorepo imports.
 * Filled in for you on purpose: get this right once, and apps/api,
 * apps/mcp-server, and apps/web all agree on the same shapes.
 */

/** A business driver being tracked, e.g. "New customers/mo" or "Burn rate". */
export interface Driver {
  id: string;
  name: string;
  unit: string; // e.g. "customers", "EUR", "headcount"
  kind: "revenue" | "cost";
}

/** What was planned for a driver in a given period. */
export interface PlannedValue {
  driverId: string;
  period: string; // ISO month, e.g. "2026-09"
  value: number;
}

/** What actually happened for a driver in a given period. */
export interface ActualValue {
  driverId: string;
  period: string;
  value: number;
  recordedAt: string; // ISO timestamp
}

/** A detected divergence between plan and actual for one driver/period. */
export interface DriftFlag {
  driverId: string;
  period: string;
  plannedValue: number;
  actualValue: number;
  deviationPct: number;
  severity: "none" | "warning" | "critical";
  detectedAt: string;
}

/** The current computed state — what the dashboard and MCP server read. */
export interface ProjectionSnapshot {
  generatedAt: string;
  runwayMonths: number;
  netBurn: number;
  driftFlags: DriftFlag[];
}
