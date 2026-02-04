import { memo } from "react";
import { clsx } from "../../lib/ui";

interface KeyProps {
  midi: number;
  isBlack: boolean;
  displayName: string;
  activeState: "idle" | "correct" | "wrong";
  showName: boolean;
  onPress: (midi: number) => void;
}

export const Key = memo(function Key({
  midi,
  isBlack,
  displayName,
  activeState,
  showName,
  onPress
}: KeyProps) {
  const baseClasses = isBlack
    ? "absolute h-32 w-8 rounded-b bg-slate-900"
    : "relative h-44 w-12 border border-slate-700 bg-slate-100 text-slate-900";

  const activeClasses =
    activeState === "correct"
      ? "bg-emerald-400 text-slate-900"
      : activeState === "wrong"
        ? "bg-rose-500 text-white"
        : "";

  return (
    <button
      type="button"
      onPointerDown={() => onPress(midi)}
      className={clsx(
        "flex items-end justify-center select-none",
        baseClasses,
        activeClasses,
        isBlack ? "text-[10px] text-slate-100" : "text-xs"
      )}
    >
      {showName && !isBlack && <span className="mb-2">{displayName}</span>}
    </button>
  );
});
