import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient'; // Import Supabase client
import Header from './header';
import './blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    // Fetch posts from Supabase
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*');
        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    // Toggle the content visibility for the clicked post
    setActivePostId(activePostId === id ? null : id);
  };

  return (
    <div className="blog-container">
      <Header />
      <h1>Blog Posts</h1>
      <ul>
        {posts.length ? (
          posts.map(post => (
            <li
              className="post-preview"
              key={post.id} // Updated to match Supabase column name
              onClick={() => handlePostClick(post.id)} // Updated to match Supabase column name
            >
              <div className="post-header">
                <h3>{post.title}</h3>
                <p>By: {post.author}</p>
              </div>
              {post.cover_image && <img src={post.cover_image} alt={post.title} />} {/* Updated to cover_image */}
              <div
                className={`post-content ${activePostId === post.id ? 'active' : ''}`} // Updated to match Supabase column name
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};

export default Blog;
