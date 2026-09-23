import { Code2, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import {
  Reveal,
  SectionHeading,
  useMotionSettings,
} from "../motion/MotionSystem";
import { profile } from "../content";

export default function About() {
  const { reduced } = useMotionSettings();

  return (
    <section id="about" className="about-section section-space">
      <div className="container">
        <SectionHeading
          number="01"
          label="ABOUT"
          description="A curious mind. A practical approach."
        >
          Behind the <span className="serif-accent">build.</span>
        </SectionHeading>
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <Reveal className="portrait-reveal">
              <motion.div
                className="about-art"
                initial={reduced ? false : { clipPath: "inset(0% 0% 12% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true }}
                transition={{ duration: reduced ? 0 : 0.7 }}
              >
                <span className="eyebrow">THE PERSON BEHIND THE PIXELS</span>
                <img
                  className="portrait"
                  src="/jayr-cutout.png"
                  alt="Jay-r B. Casano"
                  loading="lazy"
                  width="1086"
                  height="1448"
                />
                <div className="about-art-bottom">
                  <span>
                    Jayr Casano
                    <br />
                    <small>Full-Stack Developer</small>
                  </span>
                  <Code2 size={28} strokeWidth={1} />
                </div>
                <span className="art-coordinate">
                  CAVITE, PHILIPPINES / ALWAYS CURIOUS
                </span>
              </motion.div>
            </Reveal>
          </div>
          <div className="col-lg-7 about-copy">
            <Reveal delay={0.08}>
              <h3 className="about-statement">
                Thoughtful interfaces.
                <br />
                <span>Dependable systems.</span>
              </h3>
              <p>{profile.about}</p>
              <p>
                From React interfaces to Node.js APIs and ASP.NET applications,
                I enjoy understanding how the whole system fits together. My
                goal is simple: make the complex feel intuitive.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="developer-note">
                <div className="code-note-label">
                  <Code2 size={14} />
                  <span>A LITTLE ABOUT HOW I THINK</span>
                </div>
                <pre>
                  <code>
                    <span className="code-keyword">const</span> jayr = {"{"}
                    {`\n  `}role:{" "}
                    <span className="code-string">"Full-Stack Developer"</span>,
                    {`\n  `}builds: [
                    <span className="code-string">"interfaces"</span>,{" "}
                    <span className="code-string">"systems"</span>],{`\n  `}
                    approach:{" "}
                    <span className="code-string">"always learning"</span>
                    {`\n`}
                    {"}"};
                  </code>
                </pre>
              </div>
              <a href="#experience" className="text-button">
                The experience behind the work <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
