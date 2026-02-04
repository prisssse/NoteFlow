import { Attempt } from "../app/types";

export function calcAccuracyByFirstTry(attempts: Attempt[]): number {
  if (attempts.length === 0) {
    return 0;
  }
  const correctFirst = attempts.filter((attempt) => attempt.inputs[0]?.correct).length;
  return correctFirst / attempts.length;
}

export function calcAverageReactionMs(attempts: Attempt[]): number {
  const valid = attempts.filter((attempt) => attempt.firstInputAtMs !== null);
  if (valid.length === 0) {
    return 0;
  }
  const total = valid.reduce((sum, attempt) => {
    const firstInputAtMs = attempt.firstInputAtMs ?? attempt.questionShownAtMs;
    return sum + (firstInputAtMs - attempt.questionShownAtMs);
  }, 0);
  return Math.round(total / valid.length);
}

export function calcMaxStreak(attempts: Attempt[]): number {
  let streak = 0;
  let maxStreak = 0;
  for (const attempt of attempts) {
    if (attempt.inputs[0]?.correct) {
      streak += 1;
    } else {
      streak = 0;
    }
    maxStreak = Math.max(maxStreak, streak);
  }
  return maxStreak;
}
