import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useAppStore } from "../app/store";
import { Attempt, Question, SessionResult } from "../app/types";
import { generateRandomMidi } from "../lib/random";
import { midiToVexflowKey } from "../lib/note";
import { calcAccuracyByFirstTry, calcAverageReactionMs, calcMaxStreak } from "../lib/stats";
import { PianoKeyboard } from "../components/PianoKeyboard/PianoKeyboard";
import { StaffNote } from "../components/StaffNote";
import { TopBar } from "../components/TopBar";
import { MidiService } from "../lib/midi";

export function PracticePage() {
  const navigate = useNavigate();
  const config = useAppStore((state) => state.config);
  const saveResult = useAppStore((state) => state.saveResult);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [wrongMidi, setWrongMidi] = useState<number | null>(null);
  const [correctMidi, setCorrectMidi] = useState<number | null>(null);
  const [startedAtMs, setStartedAtMs] = useState<number>(() => Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);
  const midiServiceRef = useRef(new MidiService());
  const attemptsRef = useRef<Attempt[]>([]);

  useEffect(() => {
    attemptsRef.current = attempts;
  }, [attempts]);

  useEffect(() => {
    const newQuestions: Question[] = Array.from({ length: config.questionsPerSession }).map(() => {
      const midi = generateRandomMidi(config);
      return {
        id: nanoid(),
        targetMidi: midi,
        clef: config.clef,
        vexflowKey: midiToVexflowKey(midi)
      };
    });
    setQuestions(newQuestions);
    const now = Date.now();
    setAttempts(
      newQuestions.map((question, index) => ({
        questionId: question.id,
        questionShownAtMs: index === 0 ? now : 0,
        firstInputAtMs: null,
        inputs: []
      }))
    );
    setCurrentIndex(0);
    setStreak(0);
    setMaxStreak(0);
    setWrongMidi(null);
    setCorrectMidi(null);
    setStartedAtMs(now);
    setElapsedMs(0);
  }, [config]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAtMs);
    }, 250);
    return () => window.clearInterval(timer);
  }, [startedAtMs]);

  useEffect(() => {
    setAttempts((prev) => {
      const next = [...prev];
      if (next[currentIndex] && next[currentIndex].questionShownAtMs === 0) {
        next[currentIndex] = {
          ...next[currentIndex],
          questionShownAtMs: Date.now()
        };
      }
      return next;
    });
  }, [currentIndex]);

  useEffect(() => {
    const service = midiServiceRef.current;
    if (!service.isSupported || config.inputMode !== "midi") {
      return;
    }
    let unsubscribe = () => undefined;
    service
      .init()
      .then(() => {
        const inputs = service.listInputs();
        if (inputs[0]) {
          service.selectInput(inputs[0].id);
          unsubscribe = service.onNoteOn((midi) => handleInput(midi));
        }
      })
      .catch(() => undefined);
    return () => unsubscribe();
  }, [config.inputMode]);

  const currentQuestion = questions[currentIndex];

  const handleInput = useCallback(
    (midi: number) => {
      if (!currentQuestion) {
        return;
      }
      const now = Date.now();
      setAttempts((prev) => {
        const next = [...prev];
        const attempt = { ...next[currentIndex] };
        if (attempt.firstInputAtMs === null) {
          attempt.firstInputAtMs = now;
        }
        const correct = midi === currentQuestion.targetMidi;
        attempt.inputs = [...attempt.inputs, { midi, atMs: now, correct }];
        if (correct) {
          attempt.resolvedAtMs = now;
        }
        next[currentIndex] = attempt;
        return next;
      });

      if (midi === currentQuestion.targetMidi) {
        setCorrectMidi(midi);
        setWrongMidi(null);
        setStreak((prev) => {
          const next = prev + 1;
          setMaxStreak((current) => Math.max(current, next));
          return next;
        });
        window.setTimeout(() => {
          setCorrectMidi(null);
          const nextIndex = currentIndex + 1;
          if (nextIndex >= questions.length) {
            const endedAtMs = Date.now();
            const finalAttempts = attemptsRef.current.map((attempt, index) =>
              index === currentIndex && !attempt.resolvedAtMs
                ? { ...attempt, resolvedAtMs: Date.now() }
                : attempt
            );
            const result: SessionResult = {
              sessionId: nanoid(),
              startedAtMs,
              endedAtMs,
              config,
              questions,
              attempts: finalAttempts,
              summary: {
                accuracyByFirstTry: 0,
                avgReactionMs: 0,
                maxStreak: 0
              }
            };
            result.summary = {
              accuracyByFirstTry: calcAccuracyByFirstTry(result.attempts),
              avgReactionMs: calcAverageReactionMs(result.attempts),
              maxStreak: calcMaxStreak(result.attempts)
            };
            saveResult(result);
            navigate("/results");
          } else {
            setCurrentIndex(nextIndex);
          }
        }, 450);
      } else {
        setWrongMidi(midi);
        setStreak(0);
        window.setTimeout(() => setWrongMidi(null), 300);
      }
    },
    [config, currentIndex, currentQuestion, navigate, questions, saveResult, startedAtMs]
  );

  const statusLabel = useMemo(() => {
    if (config.inputMode === "midi") {
      return "输入方式：MIDI";
    }
    return "输入方式：屏幕键盘";
  }, [config.inputMode]);

  if (!currentQuestion) {
    return <div className="text-slate-400">正在准备题目...</div>;
  }

  return (
    <div className="space-y-5">
      <TopBar
        index={currentIndex}
        total={questions.length}
        streak={streak}
        elapsedMs={elapsedMs}
      />
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h3 className="text-sm text-slate-400">当前音符</h3>
        <StaffNote vexflowKey={currentQuestion.vexflowKey} clef={currentQuestion.clef} />
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>点击琴键作答</span>
          <span>{statusLabel}</span>
        </div>
        <PianoKeyboard
          onKeyPress={handleInput}
          showNoteNames={config.showNoteNamesOnKeys}
          correctMidi={correctMidi}
          wrongMidi={wrongMidi}
        />
      </section>
    </div>
  );
}
