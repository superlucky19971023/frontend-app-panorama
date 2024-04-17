import React from 'react';
import logo from '../../images/logo.png';
import './stylesFooter.css';

const Footer = () => (
  <div className="footer">
    <a href="https://www.aulasneo.com">
      <img src={logo} alt="Logo" className="logoFooter" />
    </a>
    <a href="https://aulasneo.com/contact/">Contact</a>
    <a href="/terms-of-use">Terms of Us</a>
  </div>
);

export default Footer;
