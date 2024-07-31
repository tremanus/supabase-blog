// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header'; // Adjust import path as needed
import Blog from './blog'; // Public blog page
import AdminBlog from './admin-blog'; // Admin blog page
import About from './about'; // About page (assuming you have this)
import Home from './home'; // Home page component
import PostDetail from './post'; // Post detail page component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add your Home component */}
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<PostDetail />} /> {/* Correctly passing PostDetail as a React element */}
        <Route path="/admin-blog" element={<AdminBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
