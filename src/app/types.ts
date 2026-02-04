export type MidiNote = number;

export type Clef = "treble" | "bass";
export type AccidentalMode = "off" | "on";

export interface PracticeConfig {
  clef: Clef;
  rangeMin: MidiNote;
  rangeMax: MidiNote;
  accidentalMode: AccidentalMode;
  showNoteNamesOnKeys: boolean;
  questionsPerSession: number;
  inputMode: "screen" | "midi";
}

export interface Question {
  id: string;
  targetMidi: MidiNote;
  clef: Clef;
  vexflowKey: string;
}

export interface AttemptInput {
  midi: MidiNote;
  atMs: number;
  correct: boolean;
}

export interface Attempt {
  questionId: string;
  questionShownAtMs: number;
  firstInputAtMs: number | null;
  inputs: AttemptInput[];
  resolvedAtMs?: number;
}

export interface SessionResult {
  sessionId: string;
  startedAtMs: number;
  endedAtMs: number;
  config: PracticeConfig;
  questions: Question[];
  attempts: Attempt[];
  summary: {
    accuracyByFirstTry: number;
    avgReactionMs: number;
    maxStreak: number;
  };
}
