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
    id: 'retro-todo-app',
    name: 'Retro Todo App',
    description: 'A retro-styled todo list application with pastel old computer aesthetics.',
    tags: ['React', 'TypeScript', 'SCSS'],
    githubUrl: 'https://github.com/Evalin123/retro-todo-app',
    icon: '📝',
  },
  {
    id: 'pixel-art-gallery',
    name: 'Pixel Art Gallery',
    description: 'A simple pixel art gallery showcasing user submissions with pastel retro UI.',
    tags: ['React', 'CSS', 'Art'],
    githubUrl: 'https://github.com/Evalin123/pixel-art-gallery',
    icon: '🎨',
  },
  {
    id: 'retro-chatbot',
    name: 'Retro Chatbot',
    description: 'A chatbot app with nostalgic interface and pastel old computer colors.',
    tags: ['TypeScript', 'AI', 'Chatbot'],
    githubUrl: 'https://github.com/Evalin123/retro-chatbot',
    icon: '🤖',
  },
  {
    id: 'vintage-game-hub',
    name: 'Vintage Game Hub',
    description: 'A hub for retro mini-games with pastel old computer styling.',
    tags: ['React', 'Games', 'TypeScript'],
    githubUrl: 'https://github.com/Evalin123/vintage-game-hub',
    icon: '🎮',
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
