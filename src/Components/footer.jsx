import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="cool-footer">
      <div className="cool-footer-content">
        <div className="cool-footer-about">
          <h2>DHANUSH<span>.</span></h2>

          <h3>Everything you love, in one place.</h3>

          <p>
            Discover fashion, kitchen essentials, footwear
            and technology — thoughtfully brought together
            for your everyday life.
          </p>

          <a className="cool-footer-button" href="mailto:support@example.com">
            Contact Us ↗
          </a>

          <p className="cool-copyright">
            © {new Date().getFullYear()} Dhanush. All rights reserved.
          </p>
        </div>

        <div className="cool-footer-column">
          <h4>OUR BRANDS</h4>
          <Link to="/styleaura">StyleAura</Link>
          <Link to="/cookora">Cookora</Link>
          <Link to="/stridex">StrideX</Link>
          <Link to="/technova">TechNova</Link>
        </div>

        <div className="cool-footer-column">
          <h4>EXPLORE</h4>
          <Link to="/">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="cool-footer-column">
          <h4>FOLLOW US</h4>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook ↗
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            YouTube ↗
          </a>
        </div>
      </div>

      <div className="cool-footer-bottom">
        <p>MADE FOR EVERYDAY DISCOVERY.</p>
        <p>STYLE · HOME · MOVEMENT · TECHNOLOGY</p>
      </div>

      <div className="cool-footer-big-text">DHANUSH</div>
    </footer>
  );
}