import React, { useState } from 'react'
import './MoreMenu.sass'
import { MdLogout } from 'react-icons/md';

const MoreMenu = ({ onUserLogout }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const handleLogout = () => {
    onUserLogout()
  }

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const logout = () => {
    alert('Logout function here!');
    // Add your logout logic here, e.g., redirecting to the logout page or clearing session data.

    handleLogout()

  };

  return (
    <div className="more-menu">
      <button className="more-button" onClick={toggleMenu}>
        More
      </button>
      {isMenuVisible && (
        <div className="options">
          <p>Other options...</p>
          <span className="logout-option" onClick={logout}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default MoreMenu;



