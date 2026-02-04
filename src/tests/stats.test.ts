import { describe, expect, it } from "vitest";
import { calcAccuracyByFirstTry, calcAverageReactionMs, calcMaxStreak } from "../lib/stats";
import { Attempt } from "../app/types";

const attempts: Attempt[] = [
  {
    questionId: "1",
    questionShownAtMs: 1000,
    firstInputAtMs: 1200,
    inputs: [{ midi: 60, atMs: 1200, correct: true }],
    resolvedAtMs: 1200
  },
  {
    questionId: "2",
    questionShownAtMs: 2000,
    firstInputAtMs: 2400,
    inputs: [{ midi: 61, atMs: 2400, correct: false }]
  },
  {
    questionId: "3",
    questionShownAtMs: 3000,
    firstInputAtMs: 3300,
    inputs: [{ midi: 62, atMs: 3300, correct: true }],
    resolvedAtMs: 3300
  }
];

describe("stats", () => {
  it("calculates accuracy by first try", () => {
    expect(calcAccuracyByFirstTry(attempts)).toBeCloseTo(2 / 3);
  });

  it("calculates average reaction ms", () => {
    expect(calcAverageReactionMs(attempts)).toBe(300);
  });

  it("calculates max streak", () => {
    expect(calcMaxStreak(attempts)).toBe(1);
  });
});
