import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient'; // Import Supabase client
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from './header'; // Adjust import path as needed
import './admin-blog.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const AdminBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState(''); // This will be mapped to cover_image in Supabase
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update({
            title,
            author,
            cover_image: coverImage, // Updated field name
            content
          })
          .eq('id', editPostId);
        if (error) throw error;
        setEditMode(false);
        setEditPostId(null);
      } else {
        // Create new post
        const { error } = await supabase
          .from('posts')
          .insert([{ title, author, cover_image: coverImage, content }]); // Updated field name
        if (error) throw error;
      }
      // Clear form fields
      setTitle('');
      setAuthor('');
      setCoverImage('');
      setContent('');
      // Fetch posts again to update the list
      const { data, error } = await supabase
        .from('posts')
        .select('*');
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error('Error saving post:', error.message);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setAuthor(post.author);
    setCoverImage(post.cover_image); // Updated field name
    setContent(post.content);
    setEditPostId(post.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      // Fetch posts again to update the list
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*');
      if (fetchError) throw fetchError;
      setPosts(data);
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <div className="admin">
      <Header />
      <div className="admin-blog-container">
        <div className="admin-blog-header">
          <h1>{editMode ? 'Edit Post' : 'Create Post'}</h1>
        </div>
        <form className="admin-blog-form" onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              className="admin-blog-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              type="text"
              className="admin-blog-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Cover Image URL:</label>
            <input
              type="text"
              className="admin-blog-input"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </div>
          <div>
            <label>Content:</label>
            <ReactQuill
              className="admin-blog-editor"
              value={content}
              onChange={setContent}
              style={{ height: '200px' }}
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline'],
                  ['link', 'image'],
                  [{ 'align': [] }],
                  ['clean']
                ],
                imageResize: {} // Enable image resize module
              }}
            />
          </div>
          <button type="submit" className="admin-blog-submit-button">
            {editMode ? 'Update Post' : 'Create Post'}
          </button>
        </form>
        <div className="admin-blog-posts">
          <h2>Existing Posts</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id} className="admin-blog-post">
                <div className="info">
                  <h3>{post.title}</h3>
                  <p>{post.author}</p>
                </div>
                {post.cover_image && <img src={post.cover_image} alt={post.title} className="admin-blog-post-image" />}
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="admin-blog-post-content" />
                <div className="admin-blog-buttons-container">
                  <button onClick={() => handleEdit(post)} className="admin-blog-edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="admin-blog-delete-button">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
