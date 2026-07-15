import { projects } from "../projects";
import { skillGroups } from "../skills";

// One full-screen section per project. Because it lives inside drei's
// <Scroll html>, these scroll in sync with the camera flying past each world.
export const Interface = () => {
  return (
    <div className="interface">
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
