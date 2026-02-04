import { create } from "zustand";
import { PracticeConfig, SessionResult } from "./types";
import { DEFAULT_CONFIG } from "./constants";
import { storage } from "../lib/storage";

interface AppState {
  config: PracticeConfig;
  lastResult: SessionResult | null;
  history: SessionResult[];
  setConfig: (config: PracticeConfig) => void;
  saveResult: (result: SessionResult) => void;
  loadFromStorage: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  config: DEFAULT_CONFIG,
  lastResult: null,
  history: [],
  setConfig: (config) => {
    storage.setConfig(config);
    set({ config });
  },
  saveResult: (result) => {
    const history = [result, ...get().history].slice(0, 50);
    storage.setLastResult(result);
    storage.setHistory(history);
    set({ lastResult: result, history });
  },
  loadFromStorage: () => {
    set({
      config: storage.getConfig(),
      lastResult: storage.getLastResult(),
      history: storage.getHistory()
    });
  }
}));
