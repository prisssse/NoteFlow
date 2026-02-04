import { PracticeConfig } from "../app/types";
import { isBlackKey } from "./note";
import { PIANO_MAX, PIANO_MIN } from "../app/constants";

export function generateRandomMidi(config: PracticeConfig, rng: () => number = Math.random): number {
  const { rangeMin, rangeMax, accidentalMode } = config;
  const candidates: number[] = [];
  for (let midi = rangeMin; midi <= rangeMax; midi += 1) {
    if (midi < PIANO_MIN || midi > PIANO_MAX) {
      continue;
    }
    if (accidentalMode === "off" && isBlackKey(midi)) {
      continue;
    }
    candidates.push(midi);
  }

  if (candidates.length === 0) {
    return Math.min(Math.max(rangeMin, PIANO_MIN), PIANO_MAX);
  }

  const idx = Math.floor(rng() * candidates.length);
  return candidates[idx];
}
