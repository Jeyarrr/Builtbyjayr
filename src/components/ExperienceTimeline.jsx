import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  Reveal,
  SectionHeading,
  useMotionSettings,
  timing,
} from "../motion/MotionSystem";

export default function ExperienceTimeline() {
  const { reduced, interactive } = useMotionSettings();
  return (
    <section id="experience" className="experience-section section-space">
      <div className="container">
        <SectionHeading
          number="02"
          label="EXPERIENCE"
          description="Built in the real world."
        >
          From learning to <span className="serif-accent">shipping.</span>
        </SectionHeading>
        <div className="experience-timeline">
          <motion.div
            className="timeline-line"
            aria-hidden="true"
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduced ? 0 : 0.8, ease: timing.ease }}
          />
          <Reveal className="internship-portrait">
            <span className="timeline-dot" />
            <motion.figure
              className="internship-photo"
              initial={reduced ? false : { clipPath: "inset(0% 0% 12% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.7 }}
            >
              <div className="internship-photo-visual">
                <motion.img
                  src="/experience/viotech-portrait.png"
                  alt="Jay-r Casano wearing his Viotech uniform during his internship"
                  width="941"
                  height="1255"
                  loading="lazy"
                  initial={reduced ? false : { y: 18, scale: 1.03 }}
                  whileInView={reduced ? undefined : { y: 0, scale: 1 }}
                  whileHover={interactive ? { y: -8, scale: 1.035 } : undefined}
                  viewport={{ once: true }}
                  transition={{ duration: reduced ? 0 : 0.75, ease: "easeOut" }}
                />
              </div>
              <figcaption>At Viotech I.T. Solutions</figcaption>
            </motion.figure>
          </Reveal>
          <div className="timeline-content">
            <Reveal delay={0.07} className="experience-header">
              <div>
                <span className="eyebrow">VIOTECH I.T. SOLUTIONS</span>
                <h3>
                  Associate ASP.NET Developer
                  <br />
                  <span>& IT Support Intern</span>
                </h3>
              </div>
              <div className="timeline-date experience-meta">
                <span>2025</span>
                <small>500 HOURS / INTERNSHIP</small>
              </div>
            </Reveal>
            <div className="timeline-responsibilities">
              {[
                [
                  "01",
                  "Build & maintain",
                  "Built, tested, and maintained ASP.NET and C# web applications with the development team.",
                ],
                [
                  "02",
                  "Debug & improve",
                  "Resolved issues, wrote SQL queries, and contributed to application features and performance.",
                ],
                [
                  "03",
                  "Support & troubleshoot",
                  "Diagnosed hardware, software, printer, and network issues to keep everyday operations running.",
                ],
              ].map(([number, title, text], i) => (
                <Reveal delay={0.12 + i * 0.07} key={title}>
                  <div className="responsibility">
                    <span>{number}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                    <ArrowUpRight size={15} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
