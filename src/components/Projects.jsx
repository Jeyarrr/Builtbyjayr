import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  ArrowUpRight,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BrandIcon from "./BrandIcon";
import { projects } from "../content";
import ProjectArt from "./ProjectArt";
import {
  Reveal,
  SectionHeading,
  timing,
  useMotionSettings,
} from "../motion/MotionSystem";

const filters = ["All work", "Web apps", "Websites", "UI / UX"];

function ProjectVisual({ project, image = project.image, alt }) {
  const [failed, setFailed] = useState(false);
  const imageDetails = project.gallery?.find((item) => item.src === image);
  if (image && !failed)
    return (
      <div
        className={`project-art screenshot-art ${project.color} ${project.id === "jbank" ? "jbank-screenshot" : ""} ${project.id === "tastenet" ? "tastenet-screenshot" : ""}`}
      >
        <img
          src={image}
          alt={alt || imageDetails?.alt || `${project.name} interface`}
          loading="lazy"
          width={imageDetails?.width || 1440}
          height={imageDetails?.height || 1000}
          onError={() => setFailed(true)}
        />
      </div>
    );
  return <ProjectArt project={project} />;
}

function ProjectCard({ project, index, onOpen, ref }) {
  const { reduced, interactive } = useMotionSettings();
  const targetX = useMotionValue(0),
    targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, { stiffness: 130, damping: 24 }),
    rotateY = useSpring(targetY, { stiffness: 130, damping: 24 });
  function move(event) {
    if (!interactive || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    targetX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 3);
    targetY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 3);
  }
  return (
    <motion.article
      ref={ref}
      layout={reduced ? false : "position"}
      className={`showcase-card ${project.featured ? "featured-project" : ""} project-${project.id}`}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: timing.ease }}
    >
      <Reveal className="project-image-reveal">
        <motion.button
          className="project-image-button"
          onClick={() => onOpen(project)}
          aria-label={`View ${project.name} project details`}
          onPointerMove={move}
          onPointerLeave={() => {
            targetX.set(0);
            targetY.set(0);
          }}
          style={
            interactive
              ? { rotateX, rotateY, transformPerspective: 1200 }
              : undefined
          }
        >
          <motion.div
            className="project-image-inner"
            initial={reduced ? false : { scale: 1.035 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.75, ease: timing.ease }}
          >
            <ProjectVisual project={project} />
          </motion.div>
          <span className="visual-corner-label">
            {project.image ? "INTERFACE / PREVIEW" : "INTERFACE / ILLUSTRATION"}
          </span>
          <span className="project-view-indicator">
            VIEW PROJECT <ArrowUpRight size={18} />
          </span>
        </motion.button>
      </Reveal>
      <div className="showcase-copy">
        <Reveal delay={0.04}>
          <div className="project-meta">
            <span className="project-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{project.label}</span>
            {project.featured && (
              <span className="featured-label">FEATURED</span>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-actions">
            <button className="text-button" onClick={() => onOpen(project)}>
              Explore project <ArrowRight size={16} />
            </button>
            <a
              className="external-project-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name}: ${project.id === "jbank" ? "open Figma prototype" : "open live site"}`}
            >
              <ArrowUpRight size={19} />
            </a>
            {project.github && (
              <a
                className="external-project-link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} source on GitHub`}
              >
                <BrandIcon name="GitHub" size={17} />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </motion.article>
  );
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const { reduced } = useMotionSettings();
  const [activeImage, setActiveImage] = useState(0);
  const selectedImage = project.gallery?.[activeImage];
  useEffect(() => {
    const dialog = ref.current,
      previouslyFocused = document.activeElement,
      previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="project-title"
    >
      <motion.div
        className="dialog-inner"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.3 }}
      >
        <button
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X />
        </button>
        <ProjectVisual
          key={selectedImage?.src || project.id}
          project={project}
          image={selectedImage?.src}
          alt={selectedImage?.alt}
        />
        {project.gallery?.length > 1 && (
          <>
            <div className="project-gallery-toolbar">
              <span>
                {activeImage + 1} / {project.gallery.length} ·{" "}
                {selectedImage.label}
              </span>
              <div>
                <button
                  type="button"
                  aria-label={`Previous ${project.name} screenshot`}
                  onClick={() =>
                    setActiveImage(
                      (index) =>
                        (index - 1 + project.gallery.length) %
                        project.gallery.length,
                    )
                  }
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label={`Next ${project.name} screenshot`}
                  onClick={() =>
                    setActiveImage(
                      (index) => (index + 1) % project.gallery.length,
                    )
                  }
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div
              className="project-gallery-tabs"
              role="group"
              aria-label={`${project.name} screenshots`}
            >
              {project.gallery.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  className={index === activeImage ? "is-active" : ""}
                  aria-label={`Show ${project.name} ${item.label} screenshot`}
                  aria-pressed={index === activeImage}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={item.src} alt="" loading="lazy" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
        <div className="dialog-copy">
          <span className="eyebrow">{project.label}</span>
          <h2 id="project-title">{project.name}</h2>
          <p>{project.summary}</p>
          {!project.image && (
            <p className="preview-note">
              Stylized interface illustration. Visit the project to explore the
              actual experience.
            </p>
          )}
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="dialog-links">
            <a
              className="primary-button"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {project.id === "jbank"
                ? "View Figma prototype"
                : "Visit project"}
              <ArrowUpRight size={17} />
            </a>
            {project.github && (
              <a
                className="text-button"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <BrandIcon name="GitHub" size={17} /> View source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </dialog>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All work"),
    [selected, setSelected] = useState(null);
  const { reduced } = useMotionSettings();
  const visible = projects.filter(
    (project) => filter === "All work" || project.type === filter,
  );
  return (
    <section id="work" className="work-section section-space">
      <div className="container">
        <SectionHeading
          number="03"
          label="SELECTED WORK"
          description="Real problems. Thoughtful solutions. A few things I’ve brought to life."
        >
          Proof in the <span className="serif-accent">projects.</span>
        </SectionHeading>
        <Reveal className="work-toolbar">
          <div className="filter-list" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
                {item === "All work" && (
                  <span>{String(projects.length).padStart(2, "0")}</span>
                )}
                {filter === item && (
                  <motion.span
                    className="filter-active-bg"
                    layoutId={reduced ? undefined : "project-filter"}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </button>
            ))}
          </div>
          <span className="concept-note" role="status">
            {String(visible.length).padStart(2, "0")} PROJECTS / 2025—2026
          </span>
        </Reveal>
        <div className="showcase-grid">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={projects.indexOf(project)}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
