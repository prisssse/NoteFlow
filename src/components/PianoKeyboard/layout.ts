import { isBlackKey, midiToDisplayName } from "../../lib/note";
import { PIANO_MIN, PIANO_MAX } from "../../app/constants";

export interface KeyLayout {
  midi: number;
  isBlack: boolean;
  whiteIndex: number;
  displayName: string;
}

export function buildKeyboardLayout(): KeyLayout[] {
  const layout: KeyLayout[] = [];
  let whiteIndex = 0;
  for (let midi = PIANO_MIN; midi <= PIANO_MAX; midi += 1) {
    const black = isBlackKey(midi);
    if (black) {
      layout.push({
        midi,
        isBlack: true,
        whiteIndex: whiteIndex - 1,
        displayName: midiToDisplayName(midi)
      });
    } else {
      layout.push({
        midi,
        isBlack: false,
        whiteIndex,
        displayName: midiToDisplayName(midi)
      });
      whiteIndex += 1;
    }
  }
  return layout;
}

export function getBlackKeyLeft(whiteIndex: number): number {
  return whiteIndex * 48 + 32;
}
