import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PracticeConfig } from "../app/types";
import { useAppStore } from "../app/store";
import { PIANO_MAX, PIANO_MIN } from "../app/constants";
import { midiToDisplayName } from "../lib/note";
import { MidiService } from "../lib/midi";

const questionOptions = [10, 20, 30];

export function SettingsPage() {
  const navigate = useNavigate();
  const storeConfig = useAppStore((state) => state.config);
  const setConfig = useAppStore((state) => state.setConfig);
  const [config, setLocalConfig] = useState<PracticeConfig>(storeConfig);
  const midiSupported = useMemo(() => new MidiService().isSupported, []);

  const midiOptions = useMemo(() => {
    const options: { value: number; label: string }[] = [];
    for (let midi = PIANO_MIN; midi <= PIANO_MAX; midi += 1) {
      options.push({ value: midi, label: midiToDisplayName(midi) });
    }
    return options;
  }, []);

  const handleSave = () => {
    const rangeMin = Math.min(config.rangeMin, config.rangeMax - 1);
    const rangeMax = Math.max(config.rangeMax, rangeMin + 1);
    const nextConfig = { ...config, rangeMin, rangeMax };
    setConfig(nextConfig);
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">练习设置</h2>
      <div className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="grid gap-2">
          <label className="text-sm text-slate-300">谱号</label>
          <div className="flex gap-2">
            {([
              { value: "treble", label: "高音谱号" },
              { value: "bass", label: "低音谱号" }
            ] as const).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLocalConfig({ ...config, clef: option.value })}
                className={`rounded-full px-4 py-2 text-sm ${
                  config.clef === option.value
                    ? "bg-sky-400 text-slate-950"
                    : "border border-slate-700 text-slate-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-300">音域范围</label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <span className="text-xs text-slate-400">起始</span>
              <select
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                value={config.rangeMin}
                onChange={(event) =>
                  setLocalConfig({ ...config, rangeMin: Number(event.target.value) })
                }
              >
                {midiOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-xs text-slate-400">结束</span>
              <select
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                value={config.rangeMax}
                onChange={(event) =>
                  setLocalConfig({ ...config, rangeMax: Number(event.target.value) })
                }
              >
                {midiOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-500">范围只支持 21(A0) ~ 108(C8)。</p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-300">升降号</label>
          <div className="flex gap-2">
            {([
              { value: "off", label: "关闭" },
              { value: "on", label: "开启" }
            ] as const).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLocalConfig({ ...config, accidentalMode: option.value })}
                className={`rounded-full px-4 py-2 text-sm ${
                  config.accidentalMode === option.value
                    ? "bg-sky-400 text-slate-950"
                    : "border border-slate-700 text-slate-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-300">键盘显示音名</label>
          <div className="flex items-center gap-2">
            <input
              id="showNoteNames"
              type="checkbox"
              checked={config.showNoteNamesOnKeys}
              onChange={(event) =>
                setLocalConfig({ ...config, showNoteNamesOnKeys: event.target.checked })
              }
            />
            <label htmlFor="showNoteNames" className="text-sm text-slate-200">
              开启显示
            </label>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-300">每组题数</label>
          <div className="flex gap-2">
            {questionOptions.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setLocalConfig({ ...config, questionsPerSession: count })}
                className={`rounded-full px-4 py-2 text-sm ${
                  config.questionsPerSession === count
                    ? "bg-sky-400 text-slate-950"
                    : "border border-slate-700 text-slate-200"
                }`}
              >
                {count} 题
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-300">输入方式</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLocalConfig({ ...config, inputMode: "screen" })}
              className={`rounded-full px-4 py-2 text-sm ${
                config.inputMode === "screen"
                  ? "bg-sky-400 text-slate-950"
                  : "border border-slate-700 text-slate-200"
              }`}
            >
              屏幕键盘
            </button>
            {midiSupported ? (
              <button
                type="button"
                onClick={() => setLocalConfig({ ...config, inputMode: "midi" })}
                className={`rounded-full px-4 py-2 text-sm ${
                  config.inputMode === "midi"
                    ? "bg-sky-400 text-slate-950"
                    : "border border-slate-700 text-slate-200"
                }`}
              >
                MIDI 键盘
              </button>
            ) : (
              <span className="text-xs text-slate-500">
                当前浏览器不支持 Web MIDI
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold text-slate-950"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
