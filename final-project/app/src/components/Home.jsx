import { useState, useEffect, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import retrieveUser from '../logic/retrieveUser'
import MyEventList from './MyEventList'
import HomeEventList from './HomeEventList'
import Profile from './Profile'
import EventCreator from './EventCreator'
import TargetedEventList from './TargetedEventList'
import MoreMenu from './MoreMenu'
import './MoreMenu.sass'
import { isJwtValid } from 'validators'
import './Home.sass'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { MdBeachAccess, MdFactCheck, MdPerson, MdMenu, MdLogout } from 'react-icons/md'
import { BsPlus } from 'react-icons/bs'


function Home({ onUserLogout }) {
  const logger = new Logger('Home')

  logger.info('call')

  const [name, setName] = useState(null)
  const { handleFeedback } = useContext(Context)
  const navigate = useNavigate()
  const [view, setView] = useState(null);
  const [isMenuVisible, setMenuVisibility] = useState(false)

  const handleLogout = () => {
    onUserLogout()
  }

  const logout = () => {
    alert('Logout function here!');
    // Add your logout logic here, e.g., redirecting to the logout page or clearing session data.

    handleLogout()

  };

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

  const handleToggleMenuClick = () => {
    setMenuVisibility(!isMenuVisible)
  }

  // const toggleMenu = () => {
  //   if (view === 'more-menu')
  //     setView(null)
  //   else
  //     setView('more-menu')
  // };


  logger.info('render')

  return isJwtValid(sessionStorage.token) ?
    <div className='home-container'>
      {/* top navegation bar */}
      <header className='top-container'>
        <div className='toplist-wrapper'>
          <div className='toplist'>
            <i>< BsPlus /></i>
            <a href='#' onClick={handleEventCreatorClick} to="eventCreator" >New Event</a>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className='main-content'>
        {/* Left Sidebar */}
        <aside className="sidebar-left">
          <nav className="left-container">
            <div className='left-head' onClick={handleHomeClick} >
              <img src="dc.jpg" alt=""></img>
              <h1 style={{ width: '100px' }}>{name}</h1 >
            </div>

            {/* Feed */}
            <div className='feed'>
              <a href='#' onClick={handleHomeClick} >New Feeds</a>
            </div>

            {/* Menu */}
            <div className='leftlist-wrapper'>
              <div className='list'>
                <i><MdBeachAccess /></i>
                <a href='#' onClick={handleMyEventListClick} >Events</a>
              </div>
              <div className='list'>
                <i><MdFactCheck /></i>
                <a href='#' onClick={handleTargetedEventClick} >Scheduled </a>
              </div>
              <div className='list'>
                <i><MdPerson /></i>
                <a href='#' onClick={handleProfileClick} duration={500} >Profile </a>
              </div>
            </div>

            {/* MoreMenu */}
            <div className='more-container'>
              <div className='more-wrapper'>
                <i><MdMenu /></i>
                <button className="more-button" onClick={handleToggleMenuClick}>More</button>
              </div>
              {isMenuVisible && (
                <div className="options">
                  <p>Other options...</p>
                  <i><MdLogout /></i>
                  <button className="logout-option" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}

              {/* <div className='more-wrapper'>
                <i><MdMenu /></i>
                <button className='more-buttom' onClick={toggleMenu}>More</button>
                {view === 'more-menu' && <MoreMenu />}
              </div> */}
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



{/* footer
      <footer className="Home__footer">
        <nav className='Home__footer-nav'>
          <a href="#" onClick={handleHomeClick}>Home</a>
          <a href="#" onClick={handleMyEventListClick}>My events</a>
          <a href="#" onClick={handleTargetedEventClick}>Events Targeted</a>
          <a href="#" onClick={handleProfileClick}>Profile</a>
        </nav>

      </footer> */}

