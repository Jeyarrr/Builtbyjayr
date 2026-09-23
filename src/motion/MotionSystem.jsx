import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export const timing = {
  ease: [0.22, 1, 0.36, 1],
  micro: 0.2,
  ui: 0.35,
  reveal: 0.65,
};
const MotionContext = createContext({
  reduced: false,
  interactive: false,
  paused: false,
  toggle: () => {},
});

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false,
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export function MotionProvider({ children }) {
  // Observe changes during the session as well as the initial OS preference.
  const systemReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktop = useMediaQuery(
    "(min-width: 992px) and (hover: hover) and (pointer: fine)",
  );
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem("builtbyjayr-motion") === "paused";
    } catch {
      return false;
    }
  });
  const reduced = Boolean(systemReduced || paused);
  function toggle() {
    setPaused((previous) => {
      try {
        localStorage.setItem(
          "builtbyjayr-motion",
          previous ? "enabled" : "paused",
        );
      } catch {
        /* Storage is optional. */
      }
      return !previous;
    });
  }
  return (
    <MotionContext.Provider
      value={{
        reduced,
        interactive: desktop && !reduced,
        paused,
        systemReduced,
        toggle,
      }}
    >
      <MotionConfig
        reducedMotion={reduced ? "always" : "user"}
        transition={{ duration: reduced ? 0 : timing.ui, ease: timing.ease }}
      >
        <div className="motion-root" data-motion={reduced ? "reduced" : "full"}>
          {children}
        </div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export const useMotionSettings = () => useContext(MotionContext);

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
  ...props
}) {
  const { reduced, interactive } = useMotionSettings();
  const [focused, setFocused] = useState(false);
  const supportsObserver = typeof IntersectionObserver !== "undefined";
  const hidden =
    variant === "line"
      ? { opacity: 0, scaleX: 0 }
      : { opacity: 0, y: interactive ? 26 : 12 };
  return (
    <motion.div
      className={className}
      initial={reduced || !supportsObserver ? false : hidden}
      whileInView={
        supportsObserver ? { opacity: 1, y: 0, scaleX: 1 } : undefined
      }
      animate={reduced || focused ? { opacity: 1, y: 0, scaleX: 1 } : undefined}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -24px 0px" }}
      onFocusCapture={() => setFocused(true)}
      transition={{
        duration: reduced || focused ? 0 : timing.reveal,
        delay: reduced || focused ? 0 : delay,
        ease: timing.ease,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// One semantic heading. Visual masks preserve ordinary screen-reader text.
export function RevealText({
  children,
  as: Tag = "h2",
  mode = "line",
  className = "",
  delay = 0,
  immediate = false,
  ariaLabel,
}) {
  const { reduced, interactive } = useMotionSettings();
  const canObserve = typeof IntersectionObserver !== "undefined";
  const text = typeof children === "string" ? children : "";
  const parts =
    mode === "word" && text
      ? text.split(" ")
      : Array.isArray(children)
        ? children
        : [children];
  const MotionTag = motion[Tag];
  const visible = { y: "0%", opacity: 1 };
  const hidden = {
    y: mode === "fade" || !interactive ? "15%" : "108%",
    opacity: 0,
  };
  return (
    <MotionTag
      className={`reveal-text ${className}`}
      aria-label={ariaLabel}
      initial={reduced || !canObserve ? false : "hidden"}
      animate={immediate || reduced || !canObserve ? "visible" : undefined}
      whileInView={immediate || !canObserve ? undefined : "visible"}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px 24px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.075 } },
      }}
    >
      {parts.map((part, index) => (
        <span
          className={`text-mask ${mode === "word" ? "word-mask" : ""}`}
          key={index}
          aria-hidden={ariaLabel ? true : undefined}
        >
          <motion.span
            variants={{
              hidden,
              visible: {
                ...visible,
                transition: {
                  duration: reduced ? 0 : timing.reveal,
                  delay: reduced ? 0 : delay,
                  ease: timing.ease,
                },
              },
            }}
          >
            {part}
            {mode === "word" && index < parts.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function MagneticLink({ children, className = "", ...props }) {
  const { interactive } = useMotionSettings();
  const ref = useRef(null);
  const targetX = useMotionValue(0),
    targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 250, damping: 26 }),
    y = useSpring(targetY, { stiffness: 250, damping: 26 });
  useEffect(() => {
    if (!interactive) {
      targetX.set(0);
      targetY.set(0);
    }
  }, [interactive, targetX, targetY]);
  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return;
    const bounds = ref.current.getBoundingClientRect();
    targetX.set(
      Math.max(
        -4,
        Math.min(4, (event.clientX - bounds.left - bounds.width / 2) * 0.07),
      ),
    );
    targetY.set(
      Math.max(
        -3,
        Math.min(3, (event.clientY - bounds.top - bounds.height / 2) * 0.1),
      ),
    );
  }
  return (
    <span
      ref={ref}
      className="magnetic-wrap"
      onPointerMove={move}
      onPointerLeave={() => {
        targetX.set(0);
        targetY.set(0);
      }}
    >
      <motion.a
        className={className}
        style={interactive ? { x, y } : undefined}
        {...props}
      >
        {children}
      </motion.a>
    </span>
  );
}

export function SectionHeading({ number, label, children, description }) {
  const ref = useRef(null);
  const { reduced } = useMotionSettings();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ruleProgress = useTransform(scrollYProgress, [0.04, 0.55], [0, 1]);
  return (
    <div ref={ref} className="section-heading editorial-heading">
      <motion.div
        className="section-heading-rule"
        aria-hidden="true"
        style={reduced ? undefined : { scaleX: ruleProgress }}
      />
      <div>
        <Reveal>
          <span className="eyebrow">
            <span className="section-index">{number}</span>
            {label}
          </span>
        </Reveal>
        <RevealText delay={0.06}>{children}</RevealText>
      </div>
      {description && (
        <Reveal delay={0.12} className="section-description">
          <p>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
