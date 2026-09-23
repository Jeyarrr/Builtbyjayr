import { ArrowUpRight } from "lucide-react";
import { MotionProvider, Reveal } from "./motion/MotionSystem";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="tw:relative">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <footer className="editorial-footer">
          <div className="container">
            <Reveal>
              <a
                className="footer-signature"
                href="#home"
                aria-label="BuiltByJayr, back to top"
              >
                BuiltByJayr<span>↗</span>
              </a>
            </Reveal>
            <div className="footer-inner">
              <span>© {new Date().getFullYear()} Jay-r B. Casano</span>
              <span>Built with purpose. Made with care.</span>
              <a href="#home">
                Back to top <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </footer>
      </MotionProvider>
    </ThemeProvider>
  );
}
