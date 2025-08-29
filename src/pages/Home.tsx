import '../assets/styles/pages/Home.scss';

const Home = () => {
  return (
    <main className="home">
      <section className="home__hero">
        <div className="container">
          <div className="home__hero-content">
            <h1 className="home__title">
              Hello, I'm <span className="home__title-accent">Eva</span>
            </h1>
            <p className="home__subtitle">
              A passionate developer creating amazing web experiences
            </p>
            <div className="home__cta">
              <a href="/about" className="home__cta-primary">
                About Me
              </a>
              <a href="#contact" className="home__cta-secondary">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="home__features">
        <div className="container">
          <h2 className="home__features-title">What I Do</h2>
          <div className="home__features-grid">
            <div className="home__feature-card">
              <div className="home__feature-icon">🎨</div>
              <h3>Frontend Development</h3>
              <p>Creating beautiful, responsive user interfaces with modern technologies</p>
            </div>
            <div className="home__feature-card">
              <div className="home__feature-icon">⚡</div>
              <h3>Performance Optimization</h3>
              <p>Building fast, efficient applications that provide excellent user experiences</p>
            </div>
            <div className="home__feature-card">
              <div className="home__feature-icon">🔧</div>
              <h3>Full Stack Solutions</h3>
              <p>Developing complete web applications from frontend to backend</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
