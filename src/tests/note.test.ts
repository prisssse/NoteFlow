import { describe, expect, it } from "vitest";
import { isBlackKey, midiToVexflowKey } from "../lib/note";
import { generateRandomMidi } from "../lib/random";
import { PracticeConfig } from "../app/types";

describe("note helpers", () => {
  it("converts midi to vexflow key", () => {
    expect(midiToVexflowKey(60)).toBe("c/4");
  });

  it("detects black keys", () => {
    expect(isBlackKey(61)).toBe(true);
    expect(isBlackKey(60)).toBe(false);
  });

  it("avoids black keys when accidental mode is off", () => {
    const config: PracticeConfig = {
      clef: "treble",
      rangeMin: 60,
      rangeMax: 72,
      accidentalMode: "off",
      showNoteNamesOnKeys: true,
      questionsPerSession: 10,
      inputMode: "screen"
    };
    const midi = generateRandomMidi(config, () => 0.4);
    expect(isBlackKey(midi)).toBe(false);
  });
});
