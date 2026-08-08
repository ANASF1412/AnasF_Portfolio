import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const calm = useReducedMotion();

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggleTheme = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={calm ? undefined : { scale: 1.06 }}
      whileTap={calm ? undefined : { scale: 0.94 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cyan/30 bg-cyan-soft text-cyan shadow-sm transition-colors hover:border-cyan/60 hover:bg-cyan-soft focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <motion.span
        key={theme}
        initial={calm ? false : { rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: calm ? 0 : 0.3, ease: "easeOut" }}
      >
        {theme === "dark" ? (
          <Sun aria-hidden className="h-5 w-5" />
        ) : (
          <Moon aria-hidden className="h-5 w-5" />
        )}
      </motion.span>
    </motion.button>
  );
}