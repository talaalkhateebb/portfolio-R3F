import { projects } from "../projects";
import { skillGroups } from "../skills";
import { WavingCharacter } from "./WavingCharacter";

// One full-screen section per project. Because it lives inside drei's
// <Scroll html>, these scroll in sync with the camera flying past each world.
export const Interface = () => {
  return (
    <div className="interface">
      {/* Opening "About me" section — the journey starts with who I am */}
      <section className="project-section about-section">
        <article className="project-card about-card">
          <span className="project-index">About me</span>
          <h2 className="project-title about-title">
            Hi, I'm Tala <WavingCharacter />
          </h2>
          <p className="project-desc">
            Hi, I'm Tala Alkhateeb, a software engineer and web developer who
            loves turning ideas into things people can actually use. I work
            across every stage of building products: from designing the
            interface in Figma to shipping the final website or app.
          </p>
          <p className="project-desc">
            I care about details, performance, and clean design. Whether it's
            a client website, a UI concept, or a game, I aim to make it feel
            polished and purposeful.
          </p>
          <a
            className="project-open"
            href="/cv_tala_alkhateeb-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View my CV ↗
          </a>
        </article>
      </section>

      {projects.map((project, i) => {
        // Put the card opposite the planet (planets alternate left/right).
        const cardSide = i % 2 === 0 ? "right" : "left";
        return (
          <section className="project-section" key={i}>
            <article className={`project-card project-card--${cardSide}`}>
              <span
                className="project-index"
                style={{ color: project.color }}
              >
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <h2 className="project-title">{project.title}</h2>
              <p className="project-desc">{project.description}</p>
              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                className="project-open"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--accent": project.color }}
              >
                Open project ↗
              </a>
            </article>
          </section>
        );
      })}

      {/* Closing "What I know" section */}
      <section className="project-section skills-section">
        <article className="project-card skills-card">
          <span className="project-index">What I know</span>
          <h2 className="project-title">Skills &amp; Tools</h2>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.level}>
                <span className="skill-level">{group.level}</span>
                <ul className="skill-chips">
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="skills-cta">
            <a className="project-open" href="mailto:talaalkhateebb3@gmail.com">
              Let's work together ↗
            </a>
            <div className="contact-links">
              <a href="tel:+962790055163">📞 +962 79 005 5163</a>
              <a
                href="https://wa.me/962790055163"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a href="mailto:talaalkhateebb3@gmail.com">
                talaalkhateebb3@gmail.com
              </a>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
