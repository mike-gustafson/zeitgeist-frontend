import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createPost } from '../../services/postService';

const NewPost = () => {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    link: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {

      let formattedLink = formData.link;
      if (!/^https?:\/\//i.test(formattedLink)) {
        formattedLink = `http://${formattedLink}`;
      }

      const postData = {
          title: formData.title,
          description: formData.description,
          link: formData.link,
          userId: localStorage.getItem('userId'),
      };
      
      const newPost = await createPost(postData);
      setFormData({
        title: '',
        link: '',
      });
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            autoComplete='off'
            id='title'
            name='title'
            placeholder='Enter a title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type='text'
            autoComplete='off'
            id='description'
            name='description'
            placeholder='Enter a description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type='text'
            autoComplete='off'
            id='link'
            name='link'
            placeholder='Enter a link'
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>
        <div className="buttons">
          <button type="submit">Contribute to the Zeitgeist</button>
        </div>
        {message && <p className="error">{message}</p>}
      </form>
    </main>
  );
};

export default NewPost;
