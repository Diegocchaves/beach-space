import React, { useState } from 'react'
import Logger from 'loggy'
import Context from './Context'
import { useContext } from 'react'
import { MdLogout } from 'react-icons/md'


const MoreMenu = ({ onUserLogout }) => {

  const handleLogoutClick = () => {
    alert('Logout function here!')

    handleLogout()
  }

  const handleLogout = () => {
    onUserLogout()
  }

  return (
    <div className="more-menu-container">
      <div className="more-menu-wrapper">
        <ul>
          <li>
            <a href="#" onClick={handleLogoutClick}><MdLogout />Logout</a>
          </li>
        </ul>

      </div>

    </div>
  )
}

export default MoreMenu;
