import '@/assets/styles/pages/ProjectsPage.scss';

import { useTranslation } from 'react-i18next';

import Button from '../components/shared/Button';

type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  icon?: string;
};

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
    description: 'A tiny pixel game where Charmander collects strawberries to win!',
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

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <section className="projects" aria-labelledby="projects-title">
      <h1 id="projects-title" className="title">
        {t('projects.title')}
      </h1>
      <div className="projects__grid">
        {projects.map((project) => (
          <article key={project.id} className="projects__card">
            <header className="projects__header">
              {project.icon ? (
                <span className="projects__icon" aria-hidden>
                  {project.icon}
                </span>
              ) : null}
              <h2 className="projects__name">{project.name}</h2>
            </header>
            <p className="projects__description">{project.description}</p>
            <div className="projects__tags">
              {project.tags.map((tag) => (
                <span className="projects__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="projects__actions">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button label={t('projects.viewOnGithub')} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
