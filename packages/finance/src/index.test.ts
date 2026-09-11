/**
 * Test scaffold — the brief calls for a "strong mathematical foundation,"
 * and tested formulas are how you prove that, not just claim it. Fill
 * these in as you implement each function; don't leave them as .todo
 * once the corresponding function is written.
 */
import { describe, it } from "vitest";

describe("calculateRevenue", () => {
  it.todo("sums revenue-generating drivers for a given period");
  it.todo("ignores cost drivers like headcount or burn rate");
});

describe("calculateNetBurn", () => {
  it.todo("returns a negative number when costs exceed revenue");
  it.todo("returns a positive number when the period was profitable");
});

describe("calculateRunwayMonths", () => {
  it.todo("divides cash on hand by monthly net burn");
  it.todo("handles zero or positive net burn without dividing by zero");
});

describe("detectDrift", () => {
  it.todo("returns null when actuals track the plan within threshold");
  it.todo("flags 'warning' for a moderate, sustained deviation");
  it.todo("flags 'critical' for a severe deviation");
  it.todo("does not overreact to a single noisy period");
});
