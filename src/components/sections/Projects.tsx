interface Project {
  name: string;
  desc: string;
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'Bugraoksuz.me',
    desc: 'Personal portfolio website. My first solo project merging design and engineering.',
    tags: ['React', 'TypeScript', 'CSS'],
  },
  {
    name: 'ft_printf',
    desc: 'Recreated the C standard printf function from scratch.',
    tags: ['C', 'Core Lib'],
  },
  {
    name: 'Push_swap',
    desc: 'Developed an algorithm to sort data with a minimum number of operations.',
    tags: ['C', 'Algorithms'],
  },
  {
    name: 'Minitalk',
    desc: 'Built a communication system operating via Unix signals.',
    tags: ['C', 'Unix Signals'],
  },
  {
    name: 'Libft',
    desc: 'Recoded standard C library functions from the ground up.',
    tags: ['C', 'Core Lib'],
  },
];

export const ProjectsSection = (): React.JSX.Element => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.name}
              className="project-card"
            >
              <div className="project-card-preview">
                <div className="project-card-preview-bar">
                  <div className="project-card-preview-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="project-card-preview-content">
                  <h3>{project.name}</h3>
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-card-desc">
                  {project.desc}
                </p>
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="project-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
