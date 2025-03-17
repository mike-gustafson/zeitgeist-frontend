import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { VscSignOut } from 'react-icons/vsc';
import { FaRegUserCircle, FaHome } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo(0, 0);
      window.location.reload();
    }
  };

  return (
    <nav>
      <div className="menu">
        <div className="left">
          <span className="nav-title">Zeitgeist</span>
        </div>
        <div className="right">
          {user ? (
            <>
              <span className="link">
                <Link to="/" onClick={handleHomeClick}>
                  <div className="icon-wrapper">
                    <span className="icon-label">Home</span>
                    <FaHome className="icon" />
                  </div>
                </Link>
              </span>
              <span className="link">
                <Link to="/profile">
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
          ) : (
            <>
              <span className="link">
                <Link to="/" onClick={handleHomeClick}>
                  <div className="icon-wrapper">
                    <span className="icon-label">Home</span>
                    <FaHome className="icon" />
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
