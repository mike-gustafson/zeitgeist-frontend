import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Feed from './components/Feed/Feed';
const App = () => {

  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Feed />}  />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;