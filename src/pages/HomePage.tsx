import '@/assets/styles/pages/HomePage.scss';

import { useTranslation } from 'react-i18next';

import GithubIcon from '@/components/shared/icons/GithubIcon';
import LinkedinIcon from '@/components/shared/icons/LinkedinIcon';

import Button from '../components/shared/Button';

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
          <a href="https://github.com/Evalin123" target="_blank" rel="noreferrer">
            <Button
              label={
                <>
                  <GithubIcon size={18} /> <span>{t('home.githubBtn')}</span>
                </>
              }
            />
          </a>
          <a href="https://www.linkedin.com/in/eva-lin-9baa90214/" target="_blank" rel="noreferrer">
            <Button
              label={
                <>
                  <LinkedinIcon size={18} /> <span>{t('home.linkedinBtn')}</span>
                </>
              }
            />
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
