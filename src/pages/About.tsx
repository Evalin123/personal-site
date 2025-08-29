import '../assets/styles/pages/About.scss';

const About = () => {
  return (
    <main className="about">
      <div className="container">
        <section className="about__hero">
          <h1 className="about__title">About Me</h1>
          <p className="about__subtitle">
            Learn more about my journey, skills, and passion for development
          </p>
        </section>

        <section className="about__content">
          <div className="about__intro">
            <div className="about__text">
              <h2>Hello, I'm Eva</h2>
              <p>
                I'm a passionate developer with a love for creating beautiful and functional web
                applications. My journey in tech started several years ago, and I've been constantly
                learning and growing ever since.
              </p>
              <p>
                I believe in writing clean, maintainable code and creating user experiences that
                make a difference. When I'm not coding, you can find me exploring new technologies,
                contributing to open source projects, or sharing knowledge with the developer
                community.
              </p>
            </div>
          </div>

          <div className="about__skills">
            <h2>Skills & Technologies</h2>
            <div className="about__skills-grid">
              <div className="about__skill-category">
                <h3>Frontend</h3>
                <ul>
                  <li>React & TypeScript</li>
                  <li>HTML5 & CSS3/SASS</li>
                  <li>JavaScript (ES6+)</li>
                  <li>Responsive Design</li>
                  <li>Accessibility (a11y)</li>
                </ul>
              </div>

              <div className="about__skill-category">
                <h3>Tools & Workflow</h3>
                <ul>
                  <li>Git & GitHub</li>
                  <li>Vite & Webpack</li>
                  <li>ESLint & Prettier</li>
                  <li>Jest & Testing Library</li>
                  <li>Figma & Design Systems</li>
                </ul>
              </div>

              <div className="about__skill-category">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js & Express</li>
                  <li>Python & Django</li>
                  <li>PostgreSQL & MongoDB</li>
                  <li>RESTful APIs</li>
                  <li>GraphQL</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="about__values">
            <h2>What I Value</h2>
            <div className="about__values-grid">
              <div className="about__value-card">
                <h3>Quality Code</h3>
                <p>
                  Writing clean, maintainable, and well-tested code that stands the test of time.
                </p>
              </div>
              <div className="about__value-card">
                <h3>User Experience</h3>
                <p>
                  Creating intuitive and accessible experiences that users love to interact with.
                </p>
              </div>
              <div className="about__value-card">
                <h3>Continuous Learning</h3>
                <p>
                  Staying updated with the latest technologies and best practices in the industry.
                </p>
              </div>
              <div className="about__value-card">
                <h3>Collaboration</h3>
                <p>
                  Working effectively with teams and contributing to a positive development culture.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
