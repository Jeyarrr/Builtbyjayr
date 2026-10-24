import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ArrowDown, Code2 } from "lucide-react";
import {
  MagneticLink,
  RevealText,
  timing,
  useMotionSettings,
} from "../motion/MotionSystem";
import { profile } from "../content";

export default function Hero() {
  const ref = useRef(null);
  const { reduced, interactive } = useMotionSettings();
  const inView = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 70, damping: 24 });
  const y = useSpring(targetY, { stiffness: 70, damping: 24 });
  const enter = (delay, distance = 18) => ({
    initial: reduced ? false : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.8,
      delay: reduced ? 0 : delay,
      ease: timing.ease,
    },
  });
  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    targetX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    targetY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  }

  return (
    <section id="home" ref={ref} className="cinema-hero" data-visible={inView}>
      <motion.div
        className="cinema-atmosphere"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 1.4 }}
        style={interactive ? { y: backdropY } : undefined}
      />
      <div className="container cinema-container">
        <motion.div {...enter(0.05)} className="cinema-top">
          <span className="eyebrow">
            <span className="status-dot" /> JAYR CASANO /{" "}
            {profile.role.toUpperCase()}
          </span>
          <span className="cinema-motto">
            INDEPENDENT MIND. FULL-STACK THINKING.
          </span>
        </motion.div>
        <div
          className="cinema-stage"
          onPointerMove={move}
          onPointerLeave={() => {
            targetX.set(0);
            targetY.set(0);
          }}
        >
          <motion.div
            {...enter(0.45, 0)}
            className="cinema-marquee"
            aria-hidden="true"
          >
            <div className="cinema-marquee-track">
              {[0, 1].map((copy) => (
                <span className="cinema-marquee-set" key={copy}>
                  JAYR CASANO <span> / </span> BUILTBYJAYR <span> / </span>{" "}
                </span>
              ))}
            </div>
          </motion.div>
          <div className="cinema-copy">
            <RevealText
              as="h1"
              ariaLabel="I build software for the web."
              immediate
              delay={0.65}
              className="cinema-headline"
            >
              {[
                "I build",
                <span key="software" className="cinema-word">
                  software
                </span>,
                "for the web.",
              ]}
            </RevealText>
            <motion.div {...enter(0.95)} className="cinema-actions">
              <MagneticLink className="primary-button" href="#work">
                View my work <ArrowUpRight size={18} />
              </MagneticLink>
              <a className="text-button" href="#contact">
                Let’s connect <ArrowUpRight size={17} />
              </a>
            </motion.div>
          </div>
          <div className="cinema-portrait">
            <motion.div
              className="cinema-orbits"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduced ? 0 : 1.1,
                delay: reduced ? 0 : 0.15,
                ease: timing.ease,
              }}
            >
              <span className="cinema-orbit" />
              <span className="cinema-orbit cinema-orbit-outer" />
              <span className="cinema-cross cinema-cross-one">+</span>
              <span className="cinema-cross cinema-cross-two">+</span>
            </motion.div>
            <motion.div
              className="cinema-subject-parallax"
              style={interactive ? { x, y } : undefined}
            >
              <motion.img
                className="cinema-subject"
                src="/jayr-cutout.png"
                alt="Jay-r Casano, Full-Stack Developer"
                width="1086"
                height="1448"
                fetchPriority="high"
                initial={reduced ? false : { opacity: 0, y: 35, scale: 1.025 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: reduced ? 0 : 1.1,
                  delay: reduced ? 0 : 0.3,
                  ease: timing.ease,
                }}
              />
            </motion.div>
            <motion.div
              {...enter(1)}
              className="cinema-signature"
              aria-hidden="true"
            >
              <Code2 size={20} strokeWidth={1.2} />
              <span>
                <strong>{"{ BuiltByJayr }"}</strong>
                <small>THOUGHTFULLY ENGINEERED.</small>
              </span>
              <span className="cinema-signature-index">01</span>
            </motion.div>
          </div>
          <motion.div {...enter(0.8)} className="cinema-intro">
            <span className="cinema-intro-rule" aria-hidden="true" />
            <p>{profile.intro}</p>
            <div className="cinema-stack">
              <span>React / interfaces</span>
              <span>Node + C# / systems</span>
            </div>
          </motion.div>
        </div>
        <motion.div {...enter(1.1)} className="cinema-footer">
          <span>
            BASED IN CAVITE, PHILIPPINES <span className="muted-slash">/</span>{" "}
            OPEN TO OPPORTUNITIES
          </span>
          <a href="#about">
            MEET THE DEVELOPER <ArrowDown size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
