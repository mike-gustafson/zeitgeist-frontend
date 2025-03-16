import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { VscSignOut } from 'react-icons/vsc';
import { FaRegUserCircle, FaHome } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <nav>
      <div className="menu">
        <div className="left">
          <span className="nav-title">Zeitgeist</span>
        </div>
        <div className="right">
          {user && (
            <>
              <span className="link">
                <Link to="/">
                  <div className="icon-wrapper">
                    <span className="icon-label">Home</span>
                    <FaHome className="icon" />
                  </div>
                </Link>
              </span>
              <span className="link">
                <Link to="/">
                  <div className="icon-wrapper">
                    <span className="icon-label">Profile</span>
                    <FaRegUserCircle className="icon" />
                  </div>
                </Link>
              </span>
              <span className="link">
                <Link to="/" onClick={handleSignOut}>
                  <div className="icon-wrapper">
                    <span className="icon-label">Sign Out</span>
                    <VscSignOut className="icon" />
                  </div>
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
