import { motion } from "motion/react";
import BrandIcon from "./BrandIcon";
import {
  Reveal,
  SectionHeading,
  useMotionSettings,
} from "../motion/MotionSystem";
const groups = [
  {
    label: "Frontend",
    text: "The experience",
    items: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
      "ASP.NET",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: "Backend",
    text: "The logic",
    items: ["Node.js", "Express.js", "C#"],
  },
  {
    label: "Database",
    text: "The foundation",
    items: ["PostgreSQL", "SQL Server", "Supabase"],
  },
  {
    label: "Deployment",
    text: "Out in the world",
    items: ["Azure", "Vercel", "GitHub Pages"],
  },
  {
    label: "Tools",
    text: "The everyday kit",
    items: ["Git", "GitHub", "Visual Studio", "Visual Studio Code", "Figma"],
  },
];
export default function Skills() {
  const { reduced, interactive } = useMotionSettings();
  return (
    <section id="skills" className="skills-section section-space">
      <div className="container">
        <SectionHeading
          number="04"
          label="THE TOOLKIT"
          description="From the first pixel to the final query."
        >
          Full stack. <span className="serif-accent">Considered choices.</span>
        </SectionHeading>
        <div className="technology-groups">
          {groups.map(({ label, text, items }, i) => (
            <Reveal key={label} delay={i * 0.045}>
              <div className="technology-row">
                <div className="technology-category">
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{label}</h3>
                    <p>{text}</p>
                  </div>
                </div>
                <div className="technology-items">
                  {items.map((item) => (
                    <motion.div
                      className="technology-item"
                      data-brand={item}
                      key={item}
                      tabIndex={0}
                      whileHover={interactive ? { y: -4 } : undefined}
                      whileFocus={reduced ? undefined : { y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BrandIcon name={item} />
                      <span>{item}</span>
                      <small>{label}</small>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
