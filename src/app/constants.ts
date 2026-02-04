import { PracticeConfig } from "./types";

export const PIANO_MIN = 21;
export const PIANO_MAX = 108;

export const DEFAULT_CONFIG: PracticeConfig = {
  clef: "treble",
  rangeMin: 64,
  rangeMax: 84,
  accidentalMode: "off",
  showNoteNamesOnKeys: true,
  questionsPerSession: 20,
  inputMode: "screen"
};

export const STORAGE_KEYS = {
  config: "sk_config_v1",
  lastResult: "sk_last_result_v1",
  history: "sk_history_v1"
};
