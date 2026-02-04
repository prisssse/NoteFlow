import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./App";
import { HomePage } from "../pages/HomePage";
import { SettingsPage } from "../pages/SettingsPage";
import { PracticePage } from "../pages/PracticePage";
import { ResultsPage } from "../pages/ResultsPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/practice", element: <PracticePage /> },
      { path: "/results", element: <ResultsPage /> }
    ]
  }
]);
