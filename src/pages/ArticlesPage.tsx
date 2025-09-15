import '../assets/styles/pages/ArticlesPage.scss';

import { useTranslation } from 'react-i18next';

import mcpServer from '../assets/articles/mcpServer.png';
import Button from '../components/Button';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  url: string;
  imageUrl?: string;
};

const articles: Article[] = [
  {
    id: 'ai-can-code-but-can-it-commit',
    title: 'AI Can Code, But Can It Commit? Building an MCP Server to Find Out',
    excerpt:
      'Exploring the capabilities of AI in software development by building a Model Context Protocol (MCP) server. Can AI truly understand the complete development workflow from coding to committing?',
    publishedDate: '2025-01-11',
    url: 'https://medium.com/@evalin8/ai-can-code-but-can-it-commit-building-an-mcp-server-to-find-out-39f2209c5f5c',
    imageUrl: mcpServer,
  },
  {
    id: 'retro-ui-design-tips',
    title: 'Retro UI Design Tips for Modern Developers',
    excerpt:
      'A guide to designing retro-style user interfaces with pastel colors and old computer aesthetics.',
    publishedDate: '2025-02-05',
    url: 'https://medium.com/@evalin8/retro-ui-design-tips',
    imageUrl: undefined,
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices You Should Follow',
    excerpt:
      'Learn how to write cleaner and more maintainable TypeScript code with practical tips.',
    publishedDate: '2025-03-12',
    url: 'https://medium.com/@evalin8/typescript-best-practices',
    imageUrl: undefined,
  },
  {
    id: 'ai-in-web-dev',
    title: 'AI in Web Development: Opportunities and Challenges',
    excerpt:
      'Exploring how AI tools can assist web developers, from code generation to project management.',
    publishedDate: '2025-04-20',
    url: 'https://medium.com/@evalin8/ai-in-web-dev',
    imageUrl: undefined,
  },
  {
    id: 'building-retro-components',
    title: 'Building Retro Components with React and SCSS',
    excerpt: 'Step-by-step guide to creating old computer style UI components in React.',
    publishedDate: '2025-05-08',
    url: 'https://medium.com/@evalin8/building-retro-components',
    imageUrl: undefined,
  },
];

export default function ArticlesPage() {
  const { t } = useTranslation();

  return (
    <section className="articles" aria-labelledby="articles-title">
      <h1 id="articles-title" className="title">
        {t('articles.title')}
      </h1>
      <div className="articles__grid">
        {articles.map((article) => (
          <article
            key={article.id}
            className={`articles__card${article.imageUrl ? ' articles__card--has-image' : ''}`}
          >
            {article.imageUrl ? (
              <img className="articles__image" src={article.imageUrl} alt={article.title} />
            ) : null}
            <div className="articles__content">
              <h2 className="articles__title">{article.title}</h2>
              <p className="articles__excerpt">{article.excerpt}</p>
              <div className="articles__meta">
                <time dateTime={article.publishedDate}>{article.publishedDate}</time>
              </div>
              <div className="articles__actions">
                <a href={article.url} target="_blank" rel="noreferrer">
                  <Button label={t('articles.readArticle')} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
