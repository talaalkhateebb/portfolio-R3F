import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { projects } from "./projects";
import { THEMES } from "./theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const t = THEMES[theme];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // Smooth-scroll the drei ScrollControls container (the only scrollable
  // node) to a fraction of its length — 0 = start, 1 = the skills section.
  const scrollToFraction = (fraction) => {
    const el = [...document.querySelectorAll("div")].find(
      (d) => d.scrollHeight > d.clientHeight + 20
    );
    if (el) el.scrollTo({ top: el.scrollHeight * fraction, behavior: "smooth" });
  };

  return (
    <>
      <Canvas>
        <color attach="background" args={[t.background]} />
        <fog attach="fog" args={[t.fog.color, t.fog.near, t.fog.far]} />
        <Suspense fallback={null}>
          <ScrollControls pages={projects.length + 1} damping={0.3}>
            <Experience theme={t} />
            {/* Project descriptions that scroll in sync with the journey */}
            <Scroll html style={{ width: "100%" }}>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* Persistent UI drawn over the canvas */}
      <header className="site-header">
        <span className="brand">Tala Alkhateeb</span>
        <span className="brand-role">Software Engineer · Web Developer</span>
      </header>

      <nav className="site-nav">
        <button className="nav-btn" onClick={() => scrollToFraction(0)}>
          Work
        </button>
        <button className="nav-btn" onClick={() => scrollToFraction(1)}>
          Skills
        </button>
        <a
          href="https://github.com/talaalkhateebb"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/tala-alkhateeb-8b8501234/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:talaalkhateebb3@gmail.com">Email</a>
        <a
          className="nav-cv"
          href="/cv_tala_alkhateeb-1.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </nav>

      <div className="scroll-hint">scroll to explore ↓</div>
    </>
  );
}

export default App;
