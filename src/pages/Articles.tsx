import '../assets/styles/pages/Articles.scss';

import { useTranslation } from 'react-i18next';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  url: string;
  imageUrl?: string;
};

const Articles = () => {
  const { t } = useTranslation();

  const articles: Article[] = [
    {
      id: 'websocket-vs-http',
      title: "WebSocket vs HTTP: What's the Difference and When to Use WebSocket?",
      excerpt:
        "In today's highly connected and always-online world, we expect information to be available instantly. WebSocket is one of the key technologies that enables real-time communication between clients and servers.",
      publishedDate: '2024-03-19',
      url: 'https://medium.com/@evalin8/websocket-vs-http-whats-the-difference-and-when-to-use-websocket-05b7290241e5',
      imageUrl: undefined, // 暫時不使用圖片
    },
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleArticleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="articles">
      <section className="articles__hero">
        <div className="container">
          <div className="articles__hero-content">
            <h1 className="articles__title">{t('articles.title')}</h1>
            <p className="articles__subtitle">{t('articles.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="articles__content">
        <div className="container">
          <div className="articles__grid">
            {articles.map((article) => (
              <article
                key={article.id}
                className="articles__card"
                onClick={() => handleArticleClick(article.url)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleArticleClick(article.url);
                  }
                }}
                aria-label={`${t('articles.readArticle')} ${article.title}`}
              >
                {article.imageUrl && (
                  <div className="articles__card-image">
                    <img src={article.imageUrl} alt={article.title} loading="lazy" />
                  </div>
                )}

                <div className="articles__card-content">
                  <h3 className="articles__card-title">{article.title}</h3>
                  <p className="articles__card-excerpt">{article.excerpt}</p>
                  <div className="articles__card-meta">
                    <time className="articles__card-date" dateTime={article.publishedDate}>
                      {formatDate(article.publishedDate)}
                    </time>
                  </div>
                </div>

                <div className="articles__card-link">
                  <span className="articles__card-link-text">{t('articles.readOnMedium')}</span>
                  <span className="articles__card-link-icon">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Articles;
