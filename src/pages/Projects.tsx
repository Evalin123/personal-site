import '../assets/styles/pages/Projects.scss';

import { useTranslation } from 'react-i18next';

type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  icon: string;
};

const Projects = () => {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      id: 'health-fitness-agent',
      name: 'AI Health & Fitness Agent',
      description:
        'An intelligent health and fitness companion built with Motia framework that integrates with LINE messaging to provide personalized health advice, activity tracking, meal planning, and workout recommendations',
      tags: ['TypeScript', 'AI', 'Health Tech', 'LINE Bot', 'Motia Framework'],
      githubUrl: 'https://github.com/Evalin123/health-fitness-agent',
      icon: '💪',
    },
    {
      id: 'mcp-gitlab-server',
      name: 'MCP GitLab Server',
      description:
        'A reusable Model Context Protocol (MCP) server that exposes GitLab and Git tools so your AI client',
      tags: ['TypeScript', 'Node.js', 'GitLab API', 'MCP'],
      githubUrl: 'https://github.com/Evalin123/mcp-gitlab-server',
      icon: '🔧',
    },
    {
      id: 'charberry',
      name: 'Charberry',
      description: 'Character berry project - A creative character management system',
      tags: ['React', 'TypeScript', 'Frontend'],
      githubUrl: 'https://github.com/Evalin123/charberry',
      icon: '🍓',
    },
    {
      id: 'pikto-ui',
      name: 'Pikto UI',
      description: 'A modern UI component library with clean design and accessibility focus',
      tags: ['React', 'UI Library', 'Components', 'Accessibility'],
      githubUrl: 'https://github.com/Evalin123/pikto-ui',
      icon: '🎨',
    },
    {
      id: 'weather-forecast',
      name: 'Weather Forecast',
      description: 'A beautiful weather forecast application with real-time data',
      tags: ['JavaScript', 'Weather API', 'Frontend', 'Responsive'],
      githubUrl: 'https://github.com/Evalin123/weather-forecast',
      icon: '🌤️',
    },
  ];

  const handleProjectClick = (githubUrl: string) => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="projects">
      <section className="projects__hero">
        <div className="container">
          <div className="projects__hero-content">
            <h1 className="projects__title">{t('projects.title')}</h1>
            <p className="projects__subtitle">{t('projects.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="projects__content">
        <div className="container">
          <div className="projects__grid">
            {projects.map((project) => (
              <article
                key={project.id}
                className="projects__card"
                onClick={() => handleProjectClick(project.githubUrl)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project.githubUrl);
                  }
                }}
                aria-label={`${t('projects.openProject')} ${project.name}`}
              >
                <div className="projects__card-icon">{project.icon}</div>
                <div className="projects__card-content">
                  <h3 className="projects__card-title">{project.name}</h3>
                  <p className="projects__card-description">{project.description}</p>
                  <div className="projects__card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="projects__card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="projects__card-link">
                  <span className="projects__card-link-text">{t('projects.viewOnGithub')}</span>
                  <span className="projects__card-link-icon">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
