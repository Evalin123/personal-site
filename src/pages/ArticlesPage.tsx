import '@/assets/styles/pages/ArticlesPage.scss';

import { useTranslation } from 'react-i18next';

import mcpServer from '../assets/articles/mcpServer.png';
import Button from '../components/shared/Button';

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
    id: 'websocket-vs-http',
    title: "WebSocket vs HTTP: What's the Difference and When to Use WebSocket?",
    excerpt:
      "In today's highly connected and always-online world, we expect information to be available instantly. WebSocket is one of the key technologies that enables real-time communication between clients and servers.",
    publishedDate: '2024-03-19',
    url: 'https://medium.com/@evalin8/websocket-vs-http-whats-the-difference-and-when-to-use-websocket-e8f0b8c2cee2',
    imageUrl: undefined, // 暫時不使用圖片
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
