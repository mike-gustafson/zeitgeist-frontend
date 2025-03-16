import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { updatePost } from '../../services/postService'; // Assuming you have an updatePost service
import "./EditPost.css";

const EditPost = ({ post, onCancel, onUpdatePost }) => {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
  });

  // Pre-fill the form with the existing post data
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
        link: post.link || '',
      });
    }
  }, [post]);

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // Since the link is read-only, no formatting is required.
      const postData = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
      };

      // Update the post using your update service
      const updatedPost = await updatePost(post._id, postData);
      
      // Call the parent's callback to update the feed, if provided
      if (onUpdatePost) {
        onUpdatePost(updatedPost);
      }
      
      // Optionally, navigate away or cancel editing.
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="edit-post">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <p className="title">Edit Post</p>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            disabled
          />
          <small className="note">
            If the link is incorrect, please delete the post and create a new one.
          </small>
        </div>
        <div className="buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={onCancel}>Cancel</button>
          {/* Optionally, you could also add a "Delete" button here */}
        </div>
        {message && <p className="error">{message}</p>}
      </form>
    </main>
  );
};

export default EditPost;
