import '../assets/styles/pages/HomePage.scss';

import { useTranslation } from 'react-i18next';

import Button from '../components/Button';

export default function HomePage() {
  const { t } = useTranslation();
  const name = 'Eva';

  const features = [
    {
      title: t('home.features.frontend.title'),
      description: t('home.features.frontend.description'),
    },
    {
      title: t('home.features.performance.title'),
      description: t('home.features.performance.description'),
    },
    {
      title: t('home.features.fullstack.title'),
      description: t('home.features.fullstack.description'),
    },
  ];

  return (
    <div className="home">
      <section className="panel home__hero" aria-labelledby="home-title">
        <h1 id="home-title" className="title">
          {t('home.title', { name })}
        </h1>
        <p className="home__text">{t('home.subtitle')}</p>
        <div className="home__actions">
          <a href="/about">
            <Button label={t('home.aboutBtn')} />
          </a>
          <a href="mailto:eva@example.com">
            <Button label={t('home.contactBtn')} />
          </a>
        </div>
      </section>

      <section className="home__features" aria-labelledby="what-i-do">
        <h2 id="what-i-do" className="title title--center">
          {t('home.whatIDo')}
        </h2>
        <div className="home__features-grid">
          {features.map((f) => (
            <article className="home__feature-card" key={f.title}>
              <h3 className="home__feature-title">{f.title}</h3>
              <p className="home__feature-desc">{f.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
