import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "../motion/MotionSystem";

const ThemeContext = createContext(null);
export const themeStorageKey = "builtbyjayr-theme";
const validTheme = (value) => value === "light" || value === "dark";
function savedTheme() {
  try {
    const value = localStorage.getItem(themeStorageKey);
    return validTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(savedTheme);
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = preference || (systemDark ? "dark" : "light");
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.bsTheme = theme;
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#10130f" : "#f6f7f2");
  }, [theme]);
  useEffect(() => {
    const sync = (event) => {
      if (event.key === themeStorageKey || event.key === null)
        setPreference(savedTheme());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setPreference(next);
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* Theme still works when storage is blocked. */
    }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
