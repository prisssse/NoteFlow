import { useMemo } from "react";
import { buildKeyboardLayout, getBlackKeyLeft } from "./layout";
import { Key } from "./Key";
import { clsx } from "../../lib/ui";

interface PianoKeyboardProps {
  onKeyPress: (midi: number) => void;
  showNoteNames: boolean;
  correctMidi?: number | null;
  wrongMidi?: number | null;
}

export function PianoKeyboard({
  onKeyPress,
  showNoteNames,
  correctMidi,
  wrongMidi
}: PianoKeyboardProps) {
  const keys = useMemo(() => buildKeyboardLayout(), []);
  const whiteKeys = keys.filter((key) => !key.isBlack);
  const blackKeys = keys.filter((key) => key.isBlack);
  const keyboardWidth = whiteKeys.length * 48;

  return (
    <div className="relative w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="relative" style={{ width: `${keyboardWidth}px` }}>
        <div className="flex">
          {whiteKeys.map((key) => (
            <Key
              key={key.midi}
              midi={key.midi}
              isBlack={false}
              displayName={key.displayName}
              showName={showNoteNames}
              activeState={
                correctMidi === key.midi
                  ? "correct"
                  : wrongMidi === key.midi
                    ? "wrong"
                    : "idle"
              }
              onPress={onKeyPress}
            />
          ))}
        </div>
        {blackKeys.map((key) => (
          <div
            key={key.midi}
            className={clsx("absolute top-0", wrongMidi === key.midi && "z-20")}
            style={{ left: `${getBlackKeyLeft(key.whiteIndex)}px` }}
          >
            <Key
              midi={key.midi}
              isBlack
              displayName={key.displayName}
              showName={false}
              activeState={
                correctMidi === key.midi
                  ? "correct"
                  : wrongMidi === key.midi
                    ? "wrong"
                    : "idle"
              }
              onPress={onKeyPress}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
