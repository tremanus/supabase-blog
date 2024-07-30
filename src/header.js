import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Import the styles if needed

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-container">
        <img 
          src="https://i.ibb.co/3F9QQPf/Screen-Shot-2024-07-07-at-6-05-58-PM-removebg-preview.png" 
          alt="logo" 
          className="logo" 
        />
        <span className="site-title">Tigist's Travel Blog</span>
      </Link>
      <nav>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
