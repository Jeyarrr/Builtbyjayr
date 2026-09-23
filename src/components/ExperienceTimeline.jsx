import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  Reveal,
  SectionHeading,
  useMotionSettings,
  timing,
} from "../motion/MotionSystem";

export default function ExperienceTimeline() {
  const { reduced } = useMotionSettings();
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
          <Reveal className="timeline-date">
            <span className="timeline-dot" />
            <span>2025</span>
            <small>500 HOURS / INTERNSHIP</small>
          </Reveal>
          <div className="timeline-content">
            <Reveal delay={0.07}>
              <span className="eyebrow">VIOTECH I.T. SOLUTIONS</span>
              <h3>
                Associate ASP.NET Developer
                <br />
                <span>& IT Support Intern</span>
              </h3>
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
