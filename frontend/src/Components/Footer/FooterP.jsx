import './FooterP.css'
export const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-column">
            <h3 className="footer-heading">About</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
  
          {/* Help Section */}
          <div className="footer-column">
            <h3 className="footer-heading">Help</h3>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#shipping">Shipping</a></li>
              <li><a href="#returns">Returns</a></li>
            </ul>
          </div>
  
          {/* Policies Section */}
          <div className="footer-column">
            <h3 className="footer-heading">Policies</h3>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#sitemap">Sitemap</a></li>
            </ul>
          </div>
  
          {/* Social Section */}
          <div className="footer-column">
            <h3 className="footer-heading">Connect</h3>
            <div className="social-links">
              <a href="#facebook" className="social-link" aria-label="Facebook">📘</a>
              <a href="#twitter" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#instagram" className="social-link" aria-label="Instagram">📷</a>
              <a href="#youtube" className="social-link" aria-label="YouTube">📺</a>
            </div>
            <p className="footer-description">
              Experience the best of fashion and lifestyle with our curated collection
            </p>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="footer-bottom">
          <p>© 2025 Myntra Clone. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  