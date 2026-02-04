import { Link } from "react-router-dom";
import { useAppStore } from "../app/store";

export function HomePage() {
  const lastResult = useAppStore((state) => state.lastResult);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
        <h2 className="text-2xl font-semibold">从音符到琴键，练习更专注</h2>
        <p className="mt-2 text-slate-300">
          选择谱号与音域后，SightKey 会随机出题，帮助你快速建立音符与键位的映射。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/practice"
            className="rounded-full bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950"
          >
            开始练习
          </Link>
          <Link
            to="/settings"
            className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200"
          >
            练习设置
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h3 className="text-lg font-semibold">最近一次成绩</h3>
        {lastResult ? (
          <div className="mt-3 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-900 p-3">
              <div className="text-slate-400">正确率</div>
              <div className="text-xl font-semibold text-emerald-300">
                {(lastResult.summary.accuracyByFirstTry * 100).toFixed(0)}%
              </div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3">
              <div className="text-slate-400">平均反应</div>
              <div className="text-xl font-semibold text-sky-300">
                {lastResult.summary.avgReactionMs}ms
              </div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3">
              <div className="text-slate-400">最大连对</div>
              <div className="text-xl font-semibold text-amber-300">
                {lastResult.summary.maxStreak}
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-400">还没有练习记录，点击“开始练习”试试。</p>
        )}
      </section>
    </div>
  );
}
