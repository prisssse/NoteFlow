interface TopBarProps {
  index: number;
  total: number;
  streak: number;
  elapsedMs: number;
}

export function TopBar({ index, total, streak, elapsedMs }: TopBarProps) {
  const seconds = Math.floor(elapsedMs / 1000);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm">
      <div>
        题目 <span className="font-semibold text-sky-300">{index + 1}</span> / {total}
      </div>
      <div>
        连对 <span className="font-semibold text-emerald-300">{streak}</span>
      </div>
      <div>
        用时 <span className="font-semibold text-slate-100">{seconds}s</span>
      </div>
    </div>
  );
}
