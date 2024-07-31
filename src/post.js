// src/post.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './supabaseClient'; // Import Supabase client
import Header from './header';
import './post.css';
import 'react-quill/dist/quill.snow.css';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the post based on slug
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();
        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div className="post-detail-container">
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        <div className="post-fullscreen">
          <h1>{post.title}</h1>
          <p className="author">By: {post.author}</p>
          {post.cover_image && <img src={post.cover_image} alt={post.title} className="post-fullscreen-image" />}
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="admin-blog-post-content" />
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostDetail;
