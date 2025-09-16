import '@/assets/styles/pages/AboutPage.scss';

import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <section className="about" aria-labelledby="about-title">
      <header className="about__header">
        <h1 id="about-title" className="about__title">
          {t('about.title')}
        </h1>
        <p className="about__subtitle">{t('about.subtitle')}</p>
      </header>

      <section className="intro" aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="about__intro-heading">
          {t('about.intro.heading')}
        </h2>
        <p className="about__intro-paragraph">{t('about.intro.paragraph1')}</p>
        <p className="about__intro-paragraph">{t('about.intro.paragraph2')}</p>
      </section>

      <section className="skills" aria-labelledby="skills-title">
        <h2 id="skills-title" className="title">
          {t('about.skills.title')}
        </h2>
        <div className="about__skill-boxes">
          <div className="about__window-box" role="group" aria-labelledby="skills-frontend">
            <div className="about__title-bar" id="skills-frontend">
              {t('about.skills.frontend.title')}
            </div>
            <ul className="about__item-list">
              {(
                t('about.skills.frontend.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="about__window-box" role="group" aria-labelledby="skills-tools">
            <div className="about__title-bar" id="skills-tools">
              {t('about.skills.tools.title')}
            </div>
            <ul className="about__item-list">
              {(
                t('about.skills.tools.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="about__window-box" role="group" aria-labelledby="skills-backend">
            <div className="about__title-bar" id="skills-backend">
              {t('about.skills.backend.title')}
            </div>
            <ul className="about__item-list">
              {(
                t('about.skills.backend.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="values" aria-labelledby="values-title">
        <h2 id="values-title" className="title">
          {t('about.values.title')}
        </h2>
        <div className="about__values-grid">
          {(
            t('about.values.items', {
              returnObjects: true,
            }) as Array<{
              title: string;
              description: string;
            }>
          ).map((v) => (
            <div className="about__value-card" key={v.title}>
              <div className="about__value-title">{v.title}</div>
              <div className="about__value-desc">{v.description}</div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
