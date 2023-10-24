import { useState, useEffect, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import retrieveUser from '../logic/retrieveUser'
import MyEventList from './MyEventList'
import HomeEventList from './HomeEventList'
import Profile from './Profile'
import EventCreator from './EventCreator'
import TargetedEventList from './TargetedEventList'
import { isJwtValid } from 'validators'
import './Home.sass'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { MdBeachAccess, MdFactCheck, MdPerson } from 'react-icons/md'
import { BsPlus } from 'react-icons/bs'
import { Link } from 'react-scroll'

function Home({ onUserLogout }) {
  const logger = new Logger('Home')

  logger.info('call')

  const [name, setName] = useState(null)
  const { handleFeedback } = useContext(Context)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    handleLogout()
  }

  const handleLogout = () => {
    onUserLogout()
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

  logger.info('render')

  return isJwtValid(sessionStorage.token) ?
    <div className='home-container'>
      {/* top navegation bar */}
      <header className='top-container'>
        <ul className='toplist-wrapper'>
          <li className='toplist'>
            <i>< BsPlus /></i>
            <Link onClick={handleEventCreatorClick} to="eventCreator" smooth={true} duration={500}>New Event</Link>
          </li>
        </ul>
      </header>

      {/* Main content area */}
      <main className='main-content'>
        {/* Left Sidebar */}
        <aside className="sidebar-left">
          <div className="left-container">
            <div className='left-head' onClick={handleHomeClick} >
              <img src="dc.jpg" alt=""></img>
              <h1 style={{ width: '100px' }}>{name}</h1 >
            </div>

            {/* feed */}
            <div className='feed'>
              <Link onClick={handleHomeClick} smooth={true} duration={500}>New Feeds</Link>
            </div>

            <ul className='leftlist-wrapper'>
              <li className='list'>
                <i><MdBeachAccess size={18} /></i>
                <Link onClick={handleMyEventListClick} smooth={true} duration={500}>Events</Link>
              </li>
              <li className='list'>
                <i><MdFactCheck size={18} /></i>
                <Link onClick={handleTargetedEventClick} smooth={true} duration={500}>Scheduled </Link>
              </li>
              <li className='list'>
                <i><MdPerson size={18} /></i>
                <Link onClick={handleProfileClick} duration={500} >Profile </Link>
              </li>
            </ul>
          </div>
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

