import { SocialLinks } from '../ui/SocialLinks';

export const Footer = (): React.JSX.Element => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-text">
            © {new Date().getFullYear()} Buğra Öksüz. All rights reserved.
          </p>
          <SocialLinks variant="text" className="footer-links" />
        </div>
      </div>
    </footer>
  );
};
