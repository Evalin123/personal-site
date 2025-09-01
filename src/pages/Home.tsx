import '../assets/styles/pages/Home.scss';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <main className="home">
      <section className="home__hero">
        <div className="container">
          <div className="home__hero-content">
            <h1 className="home__title">{t('home.title', { name: 'Eva' })}</h1>
            <p className="home__subtitle">{t('home.subtitle')}</p>
            <div className="home__cta">
              <a href="/about" className="home__cta-primary">
                {t('home.aboutBtn')}
              </a>
              <a href="#contact" className="home__cta-secondary">
                {t('home.contactBtn')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="home__features">
        <div className="container">
          <h2 className="home__features-title">{t('home.whatIDo')}</h2>
          <div className="home__features-grid">
            <div className="home__feature-card">
              <div className="home__feature-icon">🎨</div>
              <h3>{t('home.features.frontend.title')}</h3>
              <p>{t('home.features.frontend.description')}</p>
            </div>
            <div className="home__feature-card">
              <div className="home__feature-icon">⚡</div>
              <h3>{t('home.features.performance.title')}</h3>
              <p>{t('home.features.performance.description')}</p>
            </div>
            <div className="home__feature-card">
              <div className="home__feature-icon">🔧</div>
              <h3>{t('home.features.fullstack.title')}</h3>
              <p>{t('home.features.fullstack.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
