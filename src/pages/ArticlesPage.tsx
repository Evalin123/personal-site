import '@/assets/styles/pages/ArticlesPage.scss';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import mcpServer from '../assets/images/articles/mcpServer.png';
import webSocket from '../assets/images/articles/webSocket.png';
import Button from '../components/shared/Button';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  url: string;
  imageUrl?: string;
  isInternal?: boolean;
};

const articles: Article[] = [
  {
    id: 'react2shell',
    title: 'React2Shell (CVE-2025-55182)',
    excerpt:
      'React Server Components（RSC）中，伺服器端在解析從前端送來的 model payload 時，過度信任 payload 的內容，允許攻擊者透過 $id:constructor:constructor 這種路徑，讓 React 的 model parser 沿著原型鍊存取到 Function constructor，最後執行任意字串 → 造成 RCE。',
    publishedDate: '2025-12-16',
    url: '/articles/React2Shell-CVE-2025-55182',
    imageUrl: undefined,
    isInternal: true,
  },
  {
    id: 'ai-can-code-but-can-it-commit',
    title: 'AI Can Code, But Can It Commit? Building an MCP Server to Find Out',
    excerpt:
      'Exploring the capabilities of AI in software development by building a Model Context Protocol (MCP) server. Can AI truly understand the complete development workflow from coding to committing?',
    publishedDate: '2025-01-11',
    url: '/articles/mcp-server',
    imageUrl: mcpServer,
    isInternal: true,
  },
  {
    id: 'websocket-vs-http',
    title: "WebSocket vs HTTP: What's the Difference and When to Use WebSocket?",
    excerpt:
      "In today's highly connected and always-online world, we expect information to be available instantly. WebSocket is one of the key technologies that enables real-time communication between clients and servers.",
    publishedDate: '2024-03-19',
    url: '/articles/websocket-vs-http',
    imageUrl: webSocket,
    isInternal: true,
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
                {article.isInternal ? (
                  <Link to={article.url}>
                    <Button label={t('articles.readArticle')} />
                  </Link>
                ) : (
                  <a href={article.url} target="_blank" rel="noreferrer">
                    <Button label={t('articles.readArticle')} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
