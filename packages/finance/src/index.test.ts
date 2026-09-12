/**
 * Test scaffold — the brief calls for a "strong mathematical foundation,"
 * and tested formulas are how you prove that, not just claim it. Fill
 * these in as you implement each function; don't leave them as .todo
 * once the corresponding function is written.
 */
import { describe, it, expect } from "vitest";
import { calculateRevenue, calculateNetBurn, calculateRunwayMonths, detectDrift } from "./index";
import type { Driver, ActualValue, PlannedValue } from "@signal-drift/types";

const drivers: Driver[] = [
  { id: "d1", name: "Recurring revenue", unit: "EUR", kind: "revenue" },
  { id: "d2", name: "One-time sales", unit: "EUR", kind: "revenue" },
  { id: "d3", name: "Headcount cost", unit: "EUR", kind: "cost" },
  { id: "d4", name: "Office rent", unit: "EUR", kind: "cost" },
];

const septemberActuals: ActualValue[] = [
  { driverId: "d1", period: "2026-09", value: 10000, recordedAt: "2026-09-30T00:00:00.000Z" },
  { driverId: "d2", period: "2026-09", value: 2000, recordedAt: "2026-09-30T00:00:00.000Z" },
  { driverId: "d3", period: "2026-09", value: 8000, recordedAt: "2026-09-30T00:00:00.000Z" },
  { driverId: "d4", period: "2026-09", value: 3000, recordedAt: "2026-09-30T00:00:00.000Z" },
];

describe("calculateRevenue", () => {
  it("sums revenue-generating drivers for a given period", () => {
    expect(calculateRevenue(drivers, septemberActuals, "2026-09")).toBe(12000);
  });

  it("ignores cost drivers like headcount or burn rate", () => {
    const revenueOnly = calculateRevenue(drivers, septemberActuals, "2026-09");
    const costTotal = 8000 + 3000;
    expect(revenueOnly).not.toBe(revenueOnly + costTotal);
    expect(revenueOnly).toBe(12000);
  });
});

describe("calculateNetBurn", () => {
  it("returns a negative number when costs exceed revenue", () => {
    const highCostActuals: ActualValue[] = [
      { driverId: "d1", period: "2026-09", value: 4000, recordedAt: "2026-09-30T00:00:00.000Z" },
      { driverId: "d2", period: "2026-09", value: 1000, recordedAt: "2026-09-30T00:00:00.000Z" },
      { driverId: "d3", period: "2026-09", value: 8000, recordedAt: "2026-09-30T00:00:00.000Z" },
      { driverId: "d4", period: "2026-09", value: 3000, recordedAt: "2026-09-30T00:00:00.000Z" },
    ];
    expect(calculateNetBurn(drivers, highCostActuals, "2026-09")).toBe(-6000);
  });

  it("returns a positive number when the period was profitable", () => {
    expect(calculateNetBurn(drivers, septemberActuals, "2026-09")).toBe(1000);
  });
});

describe("calculateRunwayMonths", () => {
  it("divides cash on hand by monthly net burn", () => {
    expect(calculateRunwayMonths(5000, -1000)).toBe(5);
  });

  it("handles zero or positive net burn without dividing by zero", () => {
    expect(calculateRunwayMonths(5000, 0)).toBe(Infinity);
    expect(calculateRunwayMonths(5000, 500)).toBe(Infinity);
  });
});

describe("detectDrift", () => {
  const planned: PlannedValue = { driverId: "d1", period: "2026-09", value: 12000 };

  it("returns null when actuals track the plan within threshold", () => {
    const closeActuals: ActualValue[] = [
      { driverId: "d1", period: "2026-07", value: 11800, recordedAt: "2026-07-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-08", value: 12100, recordedAt: "2026-08-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-09", value: 11950, recordedAt: "2026-09-30T00:00:00.000Z" },
    ];
    expect(detectDrift(planned, closeActuals)).toBeNull();
  });

  it("flags 'warning' for a moderate, sustained deviation", () => {
    const laggingActuals: ActualValue[] = [
      { driverId: "d1", period: "2026-07", value: 9000, recordedAt: "2026-07-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-08", value: 9500, recordedAt: "2026-08-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-09", value: 8800, recordedAt: "2026-09-30T00:00:00.000Z" },
    ];
    const result = detectDrift(planned, laggingActuals);
    expect(result).not.toBeNull();
    expect(result?.severity).toBe("warning");
    expect(result?.actualValue).toBeCloseTo(9100);
    expect(result?.deviationPct).toBeCloseTo(-24.17, 1);
  });

  it("flags 'critical' for a severe deviation", () => {
    const crashingActuals: ActualValue[] = [
      { driverId: "d1", period: "2026-07", value: 5000, recordedAt: "2026-07-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-08", value: 5200, recordedAt: "2026-08-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-09", value: 4800, recordedAt: "2026-09-30T00:00:00.000Z" },
    ];
    const result = detectDrift(planned, crashingActuals);
    expect(result).not.toBeNull();
    expect(result?.severity).toBe("critical");
  });

  it("does not overreact to a single noisy period", () => {
    const oneOffDipActuals: ActualValue[] = [
      { driverId: "d1", period: "2026-07", value: 11800, recordedAt: "2026-07-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-08", value: 12200, recordedAt: "2026-08-31T00:00:00.000Z" },
      { driverId: "d1", period: "2026-09", value: 9000, recordedAt: "2026-09-30T00:00:00.000Z" },
    ];
    // Average of the three months stays within threshold even though
    // one month (9000) alone would look like a big miss against 12000.
    expect(detectDrift(planned, oneOffDipActuals)).toBeNull();
  });
});
