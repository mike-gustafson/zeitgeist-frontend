import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { editProfile, signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    password: '',
    passwordConf: '',
  });

  const { username, currentPassword, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const submissionData = {
        username,
        currentPassword,
        ...(showChangePassword && { password, passwordConf }),
      };
      const updatedUser = await editProfile(submissionData);
      const loggedInUser = await signIn({ username: updatedUser.username, password: currentPassword });
      setUser(loggedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    if (showChangePassword) {
      return !(username && currentPassword && password && password === passwordConf);
    }
    return !(username && currentPassword);
  };

  const formInvalid = isFormInvalid();


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <p>Edit Your Profile</p>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button 
            type="button" 
            onClick={() => setShowChangePassword(prev => !prev)}
          >
            {showChangePassword ? 'Hide Change Password' : 'Change Password'}
          </button>
        </div>
        {showChangePassword && (
          <>
            <div>
              <label htmlFor='password'>New Password:</label>
              <input
                type='password'
                id='password'
                value={password}
                name='password'
                onChange={handleChange}
                required={showChangePassword}
              />
            </div>
            <div>
              <label htmlFor='passwordConf'>Confirm New Password:</label>
              <input
                type='password'
                id='passwordConf'
                value={passwordConf}
                name='passwordConf'
                onChange={handleChange}
                required={showChangePassword}
              />
            </div>
          </>
        )}
        <div className='buttons'>
          <input
            type='password'
            id='currentPassword'
            value={currentPassword}
            name='currentPassword'
            onChange={handleChange}
            required
          />
<button disabled={isFormInvalid()}>
  {formInvalid ? "Enter current password to save" : "Save Changes"}
</button>          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        
        </div>
        <div className="buttons"></div>
      </form>
      <p>{message}</p>
    </main>
  );
};

export default Profile;
