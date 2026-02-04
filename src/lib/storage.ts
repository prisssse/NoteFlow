import { PracticeConfig, SessionResult } from "../app/types";
import { DEFAULT_CONFIG, STORAGE_KEYS } from "../app/constants";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getConfig(): PracticeConfig {
    return readJson<PracticeConfig>(STORAGE_KEYS.config, DEFAULT_CONFIG);
  },
  setConfig(config: PracticeConfig) {
    writeJson(STORAGE_KEYS.config, config);
  },
  getLastResult(): SessionResult | null {
    return readJson<SessionResult | null>(STORAGE_KEYS.lastResult, null);
  },
  setLastResult(result: SessionResult) {
    writeJson(STORAGE_KEYS.lastResult, result);
  },
  getHistory(): SessionResult[] {
    return readJson<SessionResult[]>(STORAGE_KEYS.history, []);
  },
  setHistory(history: SessionResult[]) {
    writeJson(STORAGE_KEYS.history, history);
  }
};
