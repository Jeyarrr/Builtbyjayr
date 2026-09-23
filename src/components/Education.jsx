import { GraduationCap, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "../motion/MotionSystem";
export default function Education() {
  return (
    <section id="education" className="education-section section-space">
      <div className="container">
        <SectionHeading
          number="05"
          label="EDUCATION"
          description="A foundation. Never a finish line."
        >
          Always a <span className="serif-accent">student.</span>
        </SectionHeading>
        <div className="education-list">
          {[
            ["2022 — 2026", "BS Computer Science", "AISAT College Dasmariñas"],
            [
              "2020 — 2022",
              "TVL · Computer Programming",
              "AISAT College Dasmariñas",
            ],
            ["CERTIFICATION", "Responsive Web Design", "freeCodeCamp"],
          ].map(([date, title, school], i) => (
            <Reveal delay={i * 0.07} key={title}>
              <article className="education-row">
                <span className="education-date">{date}</span>
                <GraduationCap size={22} />
                <div>
                  <h3>{title}</h3>
                  <p>{school}</p>
                </div>
                <ArrowUpRight size={18} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
