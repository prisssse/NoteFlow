import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../app/store";

export function ResultsPage() {
  const navigate = useNavigate();
  const lastResult = useAppStore((state) => state.lastResult);

  if (!lastResult) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-300">
        暂无成绩记录，先去练习吧。
        <div className="mt-4">
          <Link to="/practice" className="rounded-full bg-sky-400 px-4 py-2 text-sm text-slate-950">
            开始练习
          </Link>
        </div>
      </div>
    );
  }

  const { summary } = lastResult;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-2xl font-semibold">练习完成</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-900 p-4">
            <div className="text-xs text-slate-400">正确率</div>
            <div className="text-2xl font-semibold text-emerald-300">
              {(summary.accuracyByFirstTry * 100).toFixed(0)}%
            </div>
          </div>
          <div className="rounded-xl bg-slate-900 p-4">
            <div className="text-xs text-slate-400">平均反应</div>
            <div className="text-2xl font-semibold text-sky-300">{summary.avgReactionMs}ms</div>
          </div>
          <div className="rounded-xl bg-slate-900 p-4">
            <div className="text-xs text-slate-400">最大连对</div>
            <div className="text-2xl font-semibold text-amber-300">{summary.maxStreak}</div>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate("/practice")}
          className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950"
        >
          再来一组
        </button>
        <Link
          to="/settings"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200"
        >
          调整设置
        </Link>
        <Link
          to="/"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200"
        >
          回首页
        </Link>
      </section>
    </div>
  );
}
