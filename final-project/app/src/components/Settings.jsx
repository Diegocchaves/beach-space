import React from 'react'
import Context from './Context'
import { useContext } from 'react'


function Settings() {
  const logger = new Logger('Settings')

  logger.info('call')

  const { handleFeedback } = useContext(Context)
  return (
    <div>
      <ul>
        <li>
          <Link to="home" smooth={true} duration={500} >
            <a href="#" onClick={handleHomeClick}>Home</a>
          </Link>
        </li>
        <li>
          <Link to="profile" smooth={true} duration={500} >
            <a href="#" onClick={handleProfileClick}>Profile</a>
          </Link>
        </li>
      </ul>

    </div>
  )
}
export default Settings
