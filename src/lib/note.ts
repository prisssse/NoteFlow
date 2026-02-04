import { PIANO_MAX, PIANO_MIN } from "../app/constants";

const BLACK_PCS = new Set([1, 3, 6, 8, 10]);
const NOTE_NAMES_SHARP = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
const NOTE_NAMES_DISPLAY = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function midiToKeyIndex(midi: number): number {
  return midi - PIANO_MIN;
}

export function keyIndexToMidi(index: number): number {
  return index + PIANO_MIN;
}

export function isBlackKey(midi: number): boolean {
  const pc = midi % 12;
  return BLACK_PCS.has(pc);
}

export function midiToVexflowKey(midi: number): string {
  const pc = midi % 12;
  const name = NOTE_NAMES_SHARP[pc];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}/${octave}`;
}

export function midiToDisplayName(midi: number): string {
  const pc = midi % 12;
  const name = NOTE_NAMES_DISPLAY[pc];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

export function clampMidi(midi: number): number {
  return Math.min(Math.max(midi, PIANO_MIN), PIANO_MAX);
}

export function isValidMidi(midi: number): boolean {
  return midi >= PIANO_MIN && midi <= PIANO_MAX;
}
