import { useEffect, useContext, useState } from 'react'
import Logger from 'loggy'
import Context from './Context'
import retrieveUser from '../logic/retrieveUser'
import MyEventList from './MyEventList'
import HomeEventList from './HomeEventList'
import Profile from './Profile'
import EventCreator from './EventCreator'
import TargetedEventList from './TargetedEventList'
import Account from './Account'
import { isJwtValid } from 'validators'
import './Home.sass'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { MdBeachAccess, MdFactCheck, MdPerson, MdLogout, MdAddBox, MdHome, MdAccountCircle } from 'react-icons/md'

function Home({ onUserLogout }) {
  const logger = new Logger('Home')

  logger.info('call')

  const { handleFeedback } = useContext(Context)
  const navigate = useNavigate()
  const [name, setName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [showLogoutContainer, setShowLogoutContainer] = useState(false)

  const handleNameContainerClick = () => {
    setShowLogoutContainer(!showLogoutContainer);
  }

  const handleLogout = () => {
    onUserLogout()
  }

  const handleLogOutClick = () => {
    alert('Logout function here!');

    handleLogout()
  }

  useEffect(() => {
    logger.info('componentDidMount')

    if (isJwtValid(sessionStorage.token))
      retrieveUser(sessionStorage.token, (error, user) => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          handleLogout()

          return
        }
        setName(user.name)
        setLastName(user.lastName)
        setProfilePhoto(user.profilePhoto)
      })
    else navigate('/login')
  }, [])

  const handleHomeClick = event => {
    event.preventDefault()

    navigate('/')
  }

  const handleEventCreatorClick = event => {
    event.preventDefault()

    navigate('/eventCreator')
  }

  const handleMyEventListClick = event => {
    event.preventDefault()

    navigate('/myEventList')
  }

  const handleProfileClick = event => {
    event.preventDefault()

    navigate('/profile')
  }

  const handleTargetedEventClick = () => {

    navigate('/targetedEventList')
  }

  const handleAccountClick = () => {
    navigate('/account')
  }

  logger.info('render')

  return isJwtValid(sessionStorage.token) ?
    <div className='home-container'>

      {/* Main content area */}
      <main className='main-content'>
        {/* Left Sidebar */}
        <aside className="sidebar-left">
          <nav className="left-container">
            <div className='home-logo' onClick={handleHomeClick}>
              <img src="bs-new.png" alt="Logo" />
            </div>

            <div className='leftlist-wrapper'>
              {/* Home */}
              <div className='list' onClick={handleHomeClick} >
                <i><MdHome /></i>
                <a href='#' >Home</a>
              </div>
              <div className='list' onClick={handleEventCreatorClick}>
                <i><MdAddBox /></i>
                <a href='#'  >New Event</a>
              </div>
              <div className='list' onClick={handleMyEventListClick} >
                <i><MdBeachAccess /></i>
                <a href='#' >My Events</a>
              </div>
              <div className='list' onClick={handleTargetedEventClick}>
                <i><MdFactCheck /></i>
                <a href='#'  >RSVPed </a>
              </div>
              <div className='list' onClick={handleProfileClick} >
                <i><MdAccountCircle /></i>
                <a href='#' >Profile</a>

              </div>
            </div>
            {/* Account */}
            <div className='account-container' onClick={handleAccountClick}>
              <div className='account-link'>
                <i><MdPerson /></i>
                <a href='#'>Account </a>
              </div>
            </div>
            <div className='account-name-container' onClick={handleNameContainerClick}>
              <div className='account-name-wrapper'>
                <div className='account-profile-photo'>
                  {profilePhoto ? (
                    <img src={profilePhoto} alt='Profile' />
                  ) : (
                    <div className='initials'>{name && name.charAt(0)}{lastName && lastName.charAt(0)}</div>
                  )}
                </div>
                <div className='account-name'>
                  <p className='name'>{name} {lastName}</p>
                </div>
              </div>
              {showLogoutContainer && (
                <div className='signout-buttom-container'>
                  <i><MdLogout /></i>
                  <button className='signout-buttom' onClick={handleLogOutClick}>Sign out</button>
                </div>
              )}
            </div>

          </nav>
        </aside>

        {/* ROUTES */}
        <div className='content'>
          <Routes>
            <Route index element={<HomeEventList />} />
            <Route path="/eventCreator" element={<EventCreator />} />
            <Route path="/myEventList" element={<MyEventList />} />
            <Route path="/targetedEventList" element={<TargetedEventList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </div>

        {/* Right sidebar */}
        <aside class="sidebar-right">
          <div>
          </div>

        </aside>
      </main>
      <div>
      </div>
    </div > : <></>
}

export default Home


