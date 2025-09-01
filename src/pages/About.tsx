import '../assets/styles/pages/About.scss';

import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <main className="about">
      <div className="container">
        <section className="about__hero">
          <h1 className="about__title">{t('about.title')}</h1>
          <p className="about__subtitle">{t('about.subtitle')}</p>
        </section>

        <section className="about__content">
          <div className="about__intro">
            <div className="about__text">
              <h2>{t('about.intro.title')}</h2>
              <p>{t('about.intro.paragraph1')}</p>
              <p>{t('about.intro.paragraph2')}</p>
            </div>
          </div>

          <div className="about__skills">
            <h2>{t('about.skills.title')}</h2>
            <div className="about__skills-grid">
              <div className="about__skill-category">
                <h3>{t('about.skills.frontend.title')}</h3>
                <ul>
                  {(t('about.skills.frontend.items', { returnObjects: true }) as string[]).map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              <div className="about__skill-category">
                <h3>{t('about.skills.tools.title')}</h3>
                <ul>
                  {(t('about.skills.tools.items', { returnObjects: true }) as string[]).map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              <div className="about__skill-category">
                <h3>{t('about.skills.backend.title')}</h3>
                <ul>
                  {(t('about.skills.backend.items', { returnObjects: true }) as string[]).map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="about__values">
            <h2>{t('about.values.title')}</h2>
            <div className="about__values-grid">
              <div className="about__value-card">
                <h3>{t('about.values.quality.title')}</h3>
                <p>{t('about.values.quality.description')}</p>
              </div>
              <div className="about__value-card">
                <h3>{t('about.values.ux.title')}</h3>
                <p>{t('about.values.ux.description')}</p>
              </div>
              <div className="about__value-card">
                <h3>{t('about.values.learning.title')}</h3>
                <p>{t('about.values.learning.description')}</p>
              </div>
              <div className="about__value-card">
                <h3>{t('about.values.collaboration.title')}</h3>
                <p>{t('about.values.collaboration.description')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
