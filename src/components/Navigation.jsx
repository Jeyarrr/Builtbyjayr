import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X, Pause, Play, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { timing, useMotionSettings } from "../motion/MotionSystem";
const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false),
    [active, setActive] = useState("home"),
    [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef(null);
  const { reduced, paused, systemReduced, toggle } = useMotionSettings();
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) =>
    setScrolled((previous) =>
      value > 24 === previous ? previous : value > 24,
    ),
  );
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = [...document.querySelectorAll("main > section[id]")],
      visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry));
        const candidate = [...visible.values()]
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (candidate) setActive(candidate.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      {!reduced && (
        <motion.div
          className="scroll-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      )}
      <div className="container header-inner">
        <motion.a
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          href="#home"
          className="wordmark"
          aria-label="BuiltByJayr home"
        >
          <span className="brand-bracket">{"{"}</span>builtbyjayr
          <span className="brand-bracket">{"}"}</span>
        </motion.a>
        <nav
          id="main-nav"
          className={`nav-links ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  className="nav-active-line"
                  layoutId={reduced ? undefined : "nav-active"}
                  transition={{ duration: timing.ui, ease: timing.ease }}
                />
              )}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <div className="header-controls">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="motion-toggle"
            onClick={toggle}
            disabled={Boolean(systemReduced)}
            aria-label={
              systemReduced
                ? "Reduced motion enabled by system"
                : paused
                  ? "Enable motion"
                  : "Pause motion"
            }
            title={
              systemReduced
                ? "Reduced motion enabled by system"
                : paused
                  ? "Enable motion"
                  : "Pause motion"
            }
            aria-pressed={paused || Boolean(systemReduced)}
          >
            {reduced ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button
            ref={buttonRef}
            className="icon-button mobile-menu"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
