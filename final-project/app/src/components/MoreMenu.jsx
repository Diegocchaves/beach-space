import React, { useState } from 'react'
import './MoreMenu.sass'
import { MdLogout } from 'react-icons/md'

const MoreMenu = ({ onUserLogout }) => {


  const handleLogout = () => {
    onUserLogout()
  }

  const onLogOutClick = () => {
    alert('Logout function here!')

    handleLogout()
  }

  return (
    <div className="more-menu">
      <div className="options-container">
        <div className='options-wrapper'>
          <i><MdLogout /></i>
          <button className="options-logout-buttom" onClick={onLogOutClick}>
            Logout
          </button>
        </div>
      </div>

    </div>
  )
}

export default MoreMenu



