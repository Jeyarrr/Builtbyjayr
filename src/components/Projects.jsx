import { UnfoldSection } from "../motion/MotionSystem";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../projects-carousel.css";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
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

const filters = [
  "All work",
  ...new Set(projects.map((project) => project.type)),
];

function ProjectVisual({
  project,
  image = project.previewImage || project.image,
  alt,
}) {
  const [failed, setFailed] = useState(false);
  const imageDetails = project.gallery?.find((item) => item.src === image);
  if (image && !failed)
    return (
      <div
        className={`project-art screenshot-art ${project.color} ${project.id}-screenshot`}
      >
        <img
          src={image}
          alt={alt || imageDetails?.alt || `${project.name} interface`}
          loading="lazy"
          width={imageDetails?.width || 1440}
          height={imageDetails?.height || (project.previewImage ? 685 : 1000)}
          onError={() => setFailed(true)}
        />
      </div>
    );
  return <ProjectArt project={project} />;
}

function ProjectCard({ project, index, active, onSelect, onOpen }) {
  return (
    <article
      className={`work-slide project-${project.id}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1}. ${project.name}`}
      data-active={active}
    >
      <div className="work-card">
        <button
          className="work-card-visual"
          tabIndex={active ? 0 : -1}
          onClick={() => (active ? onOpen(project) : onSelect())}
          aria-label={
            active
              ? `View ${project.name} project details`
              : `Center ${project.name} project`
          }
          aria-hidden={!active}
        >
          <ProjectVisual project={project} />
          <span className="work-card-index">
            {String(index + 1).padStart(2, "0")} / {project.type}
          </span>
          <span className="work-image-hint">
            {active ? "Explore screenshots" : "Bring into focus"}{" "}
            <ArrowUpRight size={16} />
          </span>
        </button>
        <div className="work-card-copy" inert={!active ? true : undefined}>
          <span className="work-card-label">{project.label}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="work-card-reveal">
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <ul>
              {project.features.slice(0, 2).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="work-card-links">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name}: open live site`}
              >
                Live Preview <ArrowUpRight size={16} />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} source on GitHub`}
                >
                  <BrandIcon name="GitHub" size={16} /> GitHub{" "}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
        {!active && (
          <button
            className="work-side-select"
            onClick={onSelect}
            tabIndex={-1}
            aria-label={`Center ${project.name} project`}
          >
            <span>{project.name}</span>
            <small>Click to focus</small>
          </button>
        )}
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const { reduced } = useMotionSettings();
  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState(1);
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
        <motion.div
          key={selectedImage?.src || project.id}
          initial={reduced ? false : { opacity: 0, x: direction * 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: timing.ease }}
        >
          <ProjectVisual
            project={project}
            image={selectedImage?.src}
            alt={selectedImage?.alt}
          />
        </motion.div>
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
                  onClick={() => {
                    setDirection(-1);
                    setActiveImage(
                      (index) =>
                        (index - 1 + project.gallery.length) %
                        project.gallery.length,
                    );
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label={`Next ${project.name} screenshot`}
                  onClick={() => {
                    setDirection(1);
                    setActiveImage(
                      (index) => (index + 1) % project.gallery.length,
                    );
                  }}
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
          <h2 id="project-title">{project.title || project.name}</h2>
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
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reduced } = useMotionSettings();
  const visible = projects.filter(
    (project) => filter === "All work" || project.type === filter,
  );
  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    duration: reduced ? 0 : 32,
    skipSnaps: false,
  });
  const wheelLock = useRef(0);
  const pointerStart = useRef(null);
  const dragged = useRef(false);
  const onSelect = useCallback(() => {
    if (api) setActiveIndex(api.selectedScrollSnap());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api, onSelect]);
  useEffect(() => {
    if (api) {
      api.reInit();
      api.scrollTo(0, true);
    }
    setActiveIndex(0);
  }, [filter, api]);
  function choose(index) {
    api?.scrollTo(index, reduced);
    setActiveIndex(index);
  }
  function keyboard(event) {
    if (
      event.target.closest("a, button") &&
      !event.target.classList.contains("work-card-visual")
    )
      return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") choose(0);
    else if (event.key === "End") choose(visible.length - 1);
    else if (event.key === "ArrowLeft") api?.scrollPrev(reduced);
    else api?.scrollNext(reduced);
  }
  return (
    <UnfoldSection id="work" className="work-section section-space">
      <div className="container">
        <SectionHeading
          number="03"
          label="SELECTED WORK"
          description="Real problems. Thoughtful solutions. A few things I've brought to life."
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
          <span className="concept-note">
            {String(visible.length).padStart(2, "0")} PROJECTS / 2025–2026
          </span>
        </Reveal>
      </div>
      <div
        className="work-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        onKeyDown={keyboard}
      >
        <div
          className="work-carousel-viewport"
          ref={viewportRef}
          tabIndex={0}
          aria-label="Drag or use left and right arrow keys to browse projects"
          onPointerDownCapture={(event) => {
            pointerStart.current = { x: event.clientX, y: event.clientY };
            dragged.current = false;
          }}
          onPointerMoveCapture={(event) => {
            if (
              pointerStart.current &&
              Math.abs(event.clientX - pointerStart.current.x) > 8
            )
              dragged.current = true;
          }}
          onPointerUpCapture={() => {
            pointerStart.current = null;
            // The click from this gesture is synchronous; later keyboard and
            // assistive clicks must not inherit the drag suppression.
            setTimeout(() => {
              dragged.current = false;
            }, 0);
          }}
          onPointerCancelCapture={() => {
            pointerStart.current = null;
            dragged.current = false;
          }}
          onClickCapture={(event) => {
            if (dragged.current) {
              event.preventDefault();
              event.stopPropagation();
              dragged.current = false;
            }
          }}
          onWheel={(event) => {
            // Only horizontal intent belongs to the carousel; page scrolling stays native.
            if (
              Math.abs(event.deltaX) < Math.abs(event.deltaY) ||
              Math.abs(event.deltaX) < 8
            )
              return;
            const now = performance.now();
            if (now - wheelLock.current < 400) return;
            wheelLock.current = now;
            event.deltaX > 0
              ? api?.scrollNext(reduced)
              : api?.scrollPrev(reduced);
          }}
        >
          <div className="work-carousel-track">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={projects.indexOf(project)}
                active={index === activeIndex}
                onSelect={() => choose(index)}
                onOpen={setSelected}
              />
            ))}
          </div>
        </div>
        <div className="container work-carousel-footer">
          <p className="work-carousel-instruction">
            <span aria-hidden="true">
              <MoveHorizontal size={16} />
            </span>{" "}
            Drag to explore{" "}
            <span className="work-keyboard-hint">/ Arrow keys to navigate</span>
          </p>
          <div
            className="work-pagination"
            role="group"
            aria-label="Choose project"
          >
            {visible.map((project, index) => (
              <button
                key={project.id}
                className={index === activeIndex ? "is-active" : ""}
                aria-label={`Select ${project.name} project`}
                aria-pressed={index === activeIndex}
                onClick={() => choose(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <p
            className="work-current-project"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(visible.length).padStart(2, "0")}{" "}
            <span>{visible[activeIndex]?.name}</span>
          </p>
        </div>
      </div>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </UnfoldSection>
  );
}
