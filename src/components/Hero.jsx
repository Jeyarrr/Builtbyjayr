import { useRef } from "react";
import {
  motion,
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

function DeveloperSignature() {
  const { reduced, interactive } = useMotionSettings();
  const targetX = useMotionValue(0),
    targetY = useMotionValue(0);
  const rotateY = useSpring(targetX, { stiffness: 90, damping: 22 }),
    rotateX = useSpring(targetY, { stiffness: 90, damping: 22 });
  const glassX = useTransform(rotateY, [-3.5, 3.5], ["0%", "100%"]);
  const glassY = useTransform(rotateX, [-3.5, 3.5], ["100%", "0%"]);
  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    targetX.set(((event.clientX - box.left) / box.width - 0.5) * 7);
    targetY.set(-((event.clientY - box.top) / box.height - 0.5) * 7);
  }
  return (
    <div
      className="signature-stage"
      onPointerMove={move}
      onPointerLeave={() => {
        targetX.set(0);
        targetY.set(0);
      }}
      aria-hidden="true"
    >
      <div className="architecture-grid" />
      <span className="signature-orb signature-orb-one" />
      <span className="signature-orb signature-orb-two" />
      <span className="stage-corner corner-tl">+</span>
      <span className="stage-corner corner-br">+</span>
      <motion.div
        className="signature-architecture"
        style={
          interactive
            ? { rotateX, rotateY, "--glass-x": glassX, "--glass-y": glassY }
            : undefined
        }
      >
        <div className="signature-rail rail-one" />
        <div className="signature-rail rail-two" />
        <div className="signature-caption">
          <span>01 / DEVELOPER SIGNATURE</span>
          <Code2 size={15} />
        </div>
        <div className="signature-lockup">
          <motion.span
            className="signature-brace"
            initial={reduced ? false : { x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: reduced ? 0 : 0.4,
              duration: reduced ? 0 : 0.55,
              ease: timing.ease,
            }}
          >
            {"{"}
          </motion.span>
          <div className="signature-name">
            {["Built", "By", "Jayr"].map((word, index) => (
              <span className="signature-mask" key={word}>
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: reduced ? 0 : 0.4 + index * 0.085,
                    duration: reduced ? 0 : 0.55,
                    ease: timing.ease,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
          <motion.span
            className="signature-brace"
            initial={reduced ? false : { x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: reduced ? 0 : 0.4,
              duration: reduced ? 0 : 0.55,
              ease: timing.ease,
            }}
          >
            {"}"}
          </motion.span>
        </div>
        <motion.div
          className="signature-rule"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: reduced ? 0 : 0.65,
            duration: reduced ? 0 : 0.5,
            ease: timing.ease,
          }}
        />
        <div className="signature-bottom">
          <span>THOUGHTFULLY ENGINEERED.</span>
          <span>
            CAVITE
            <br />
            PHILIPPINES
          </span>
        </div>
        <span className="architecture-node node-one" />
        <span className="architecture-node node-two" />
      </motion.div>
      <motion.span
        className="architecture-chip chip-one"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.7, duration: reduced ? 0 : 0.4 }}
      >
        React / interfaces
      </motion.span>
      <motion.span
        className="architecture-chip chip-two"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.8, duration: reduced ? 0 : 0.4 }}
      >
        Node + C# / systems
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { reduced, interactive } = useMotionSettings();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -45]),
    visualY = useTransform(scrollYProgress, [0, 1], [0, 65]),
    gridY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.65]);
  const enter = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.5,
      delay: reduced ? 0 : delay,
      ease: timing.ease,
    },
  });
  return (
    <section id="home" ref={ref} className="hero cinematic-hero">
      <motion.div
        className="hero-atmosphere"
        initial={reduced ? false : { opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 4, ease: timing.ease }}
        style={interactive ? { y: gridY } : undefined}
        aria-hidden="true"
      />
      <div className="container hero-container">
        <div className="hero-top">
          <motion.span {...enter(0.05)} className="eyebrow">
            <span className="status-dot" /> JAYR CASANO /{" "}
            {profile.role.toUpperCase()}
          </motion.span>
          <span className="hero-index">
            INDEPENDENT MIND. FULL-STACK THINKING.
          </span>
        </div>
        <div className="row align-items-center hero-main-row">
          <motion.div
            className="col-lg-8 hero-copy"
            style={interactive ? { y: copyY, opacity } : undefined}
          >
            <motion.p {...enter(0.1)} className="hero-intro">
              Jayr Casano. Full-Stack Developer.
            </motion.p>
            <RevealText
              as="h1"
              ariaLabel="I build software for the web."
              immediate
              delay={0.14}
              className="hero-headline"
            >
              {[
                "I build",
                <span key="software" className="serif-accent">
                  software
                </span>,
                "for the web.",
              ]}
            </RevealText>
            <motion.p {...enter(0.42)} className="hero-description">
              {profile.intro}
            </motion.p>
            <motion.div {...enter(0.56)} className="hero-actions">
              <MagneticLink className="primary-button" href="#work">
                View my work <ArrowUpRight size={18} />
              </MagneticLink>
              <a className="text-button" href="#contact">
                Let’s connect <ArrowUpRight size={17} />
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            className="col-lg-4 hero-visual-col"
            style={interactive ? { y: visualY } : undefined}
          >
            <DeveloperSignature />
          </motion.div>
        </div>
        <motion.div {...enter(0.7)} className="hero-bottom">
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
