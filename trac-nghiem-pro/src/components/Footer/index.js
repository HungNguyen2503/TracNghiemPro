import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ()=>{
  return (
    <footer className="footer">
      <div className="footer__info">
        <h3>Exam Pro</h3>
        <div className="footer__container">
          <p>&copy; 2025 Exam Pro. All rights reserved.</p>
          <div className="footer__socials">
            <div className="footer__icon-social"><FaFacebook /></div>
            <div className="footer__icon-social"><FaGoogle /></div>
            <div className="footer__icon-social"><FaGithub /></div>
          </div>
        </div>
      </div>
      <div className="footer__links">
        <h3>Links</h3>
        <div className="footer__container">
          <Link >Home</Link>
          <Link >About Us</Link>
          <Link >Contact</Link>
          <Link >Privacy Policy</Link>
          <Link >Terms of Service</Link>
        </div>
      </div>
      <div className="footer__support">
        <h3>Support</h3>
        <div className="footer__container">
          <Link >About us</Link>
          <Link >Services</Link>
          <Link >Products</Link>
          <Link >Blog</Link>
          <Link >News</Link>
          <Link >FAQ</Link>
          <Link >Careers</Link>
        </div>
      </div>
      <div className="footer__contact">
        <div className="footer__container">
          <h3>Contact Us</h3>
          <p>Email: exampro@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Exam Street, Knowledge City</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;