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
import { MdHome, MdOutlineCalendarToday, MdLogout, MdPermIdentity, MdAddCircleOutline, MdListAlt } from "react-icons/md"
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

    // header
    <div className="headbar">
      <div className='name'>
        <h1 style={{ width: '100px' }}>Hello {name}</h1 >
      </div>

      <ul className='list'>
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



      <Routes>
        <Route index element={<HomeEventList />} />
        <Route path="/eventCreator" element={<EventCreator />} />
        <Route path="/myEventList" element={<MyEventList />} />
        <Route path="/targetedEventList" element={<TargetedEventList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>


      {/* footer
      <footer className="Home__footer">
        <nav className='Home__footer-nav'>
          <a href="#" onClick={handleHomeClick}>Home</a>
          <a href="#" onClick={handleMyEventListClick}>My events</a>
          <a href="#" onClick={handleTargetedEventClick}>Events Targeted</a>
          <a href="#" onClick={handleProfileClick}>Profile</a>
        </nav>

      </footer> */}
    </div> : <></>
}

export default Home

