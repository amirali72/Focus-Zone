import { useState, lazy, Suspense, useEffect } from "react";
import Pomodoro from "./pages/Pomodoro";
import Todo from "./pages/Todo";
const Notes = lazy(() => import("./pages/Notes"));
const Memory = lazy(() => import("./pages/Memory"));
const Weather = lazy(() => import("./pages/Weather"));
const About = lazy(() => import("./pages/About"));
import { MoonStar, Sun } from 'lucide-react';
import { useDarkMode } from "./hooks/useDarkMode";

export default function App() {
  const [active, setActive] = useState("todo");
  const [darkMode, setDarkMode] = useState(true);
  const {theme, toggleTheme} = useDarkMode();

  const tabs = [
    { id: "todo", label: "Todo" },
    { id: "notes", label: "Notes" },
    { id: "weather", label: "Weather" },
    { id: "memory", label: "Memory" },
    { id: "about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-[#f2faf7] dark:bg-gray-900 text-gray-800 flex flex-col items-center p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="relative w-full max-w-3xl flex items-center justify-center">
        
        <h1 className="text-2xl sm:text-4xl font-bold text-teal-600">
          Focus Zone
        </h1>
        
        <button
          onClick={toggleTheme}
          className="absolute right-0 bg-teal-600 dark:bg-teal-700 text-white dark:text-gray-300 px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-teal-700 transition"
        >
          {theme === "dark" ? <Sun/> : <MoonStar/>}
          
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-gray-600 shadow-md rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-500">
        <Pomodoro />
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:space-x-3 sm:gap-0 bg-white dark:bg-gray-600 px-3 sm:px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-400">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
              ${
                active === tab.id
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-gray-600 shadow-md rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-400">
        {active === "todo" && <Todo />}
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
          }
        >
          {active === "notes" && <Notes />}
          {active === "memory" && <Memory />}
          {active === "weather" && <Weather />}
          {active === "about" && <About />}
        </Suspense>
      </div>
    </div>
  );
}
