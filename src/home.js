// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './home.css'; // Import the styles

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      performSearch();
    }
  };

  const performSearch = () => {
    // Redirect to the Blog page with the search term as a query parameter
    navigate(`/blog?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="main-content">
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to my Travel Blog!</h1>
          <p>Discover amazing travel destinations, itineraries, and tips.</p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch} // Trigger search on Enter key press
            />
          </div>
        </div>
      </div>
      <div className="container">
        {/* Content below the hero section */}
      </div>
    </div>
  );
}

export default Home;
