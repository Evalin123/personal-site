import '../assets/styles/components/Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__info">
            <p className="footer__copyright">© {currentYear} Eva. All rights reserved.</p>
          </div>

          <div className="footer__links">
            <a
              href="https://github.com"
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a href="mailto:hello@eva.dev" className="footer__link" aria-label="Email Contact">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
