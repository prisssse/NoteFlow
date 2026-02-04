import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppStore } from "./store";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/settings", label: "设置" },
  { to: "/practice", label: "练习" }
];

export function AppLayout() {
  const location = useLocation();
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold">SightKey</h1>
            <p className="text-xs text-slate-400">识谱到琴键的轻量练习器</p>
          </div>
          <nav className="flex gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-3 py-1 text-sm transition ${
                    active ? "bg-sky-500 text-slate-950" : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
