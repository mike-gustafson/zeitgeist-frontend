import { useContext } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import { UserContext } from './contexts/UserContext';

import Feed from './components/Feed/Feed';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Profile from './components/Profile/Profile';

const App = () => {

  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Feed />}  />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;