import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from './supabaseClient'; // Import Supabase client
import Header from './header';
import './blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="blog-container">
      <Header />
      <h1>Blog Posts</h1>
      <ul>
        {posts.length ? (
          posts.map(post => (
            <li className="post-preview" key={post.id}>
              <Link to={`/blog/${post.slug}`}>
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <p>{post.author}</p>
                </div>
                {post.cover_image && <img src={post.cover_image} alt={post.title} className="post-preview-image" />}
              </Link>
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
