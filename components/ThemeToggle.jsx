"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const frame = requestAnimationFrame(() => setTheme(document.documentElement.dataset.theme || "dark"));
    return () => cancelAnimationFrame(frame);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    window.dispatchEvent(new CustomEvent("portfolio-theme-change", { detail: next }));
    setTheme(next);
  };
  const isDark = theme === "dark";
  return <button type="button" onClick={toggle} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={!isDark} className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-white/15 bg-cosmic/85 text-hud-text backdrop-blur-xl transition hover:border-gold hover:text-gold"><AnimatePresence mode="wait" initial={false}>{isDark ? <motion.span key="sun" initial={{y:18,rotate:-45,opacity:0}} animate={{y:0,rotate:0,opacity:1}} exit={{y:-18,rotate:45,opacity:0}}><Sun size={19}/></motion.span> : <motion.span key="moon" initial={{y:18,rotate:-45,opacity:0}} animate={{y:0,rotate:0,opacity:1}} exit={{y:-18,rotate:45,opacity:0}}><Moon size={19}/></motion.span>}</AnimatePresence></button>;
}
