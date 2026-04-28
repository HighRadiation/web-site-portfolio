export const Footer = (): React.JSX.Element => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-text">
            © {new Date().getFullYear()} Buğra Öksüz. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="https://github.com/HighRadiation" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/bu%C4%9Fra-%C3%B6ks%C3%BCz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/bugra._.oksuz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
