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

    <div className="Home Container">
      <header className="Home__header">
        <div className='Home__header-nav'>
          <h1>Hola {name}</h1>
          <a href="#" onClick={handleEventCreatorClick}><MdAddCircleOutline className="icons" /></a>
          <a href="#" onClick={handleLogoutClick}><MdLogout /></a>
        </div>
      </header>

      <main className="Home__body">
        <Routes>
          <Route index element={<HomeEventList />} />
          <Route path="/eventCreator" element={<EventCreator />} />
          <Route path="/myEventList" element={<MyEventList />} />
          <Route path="/targetedEventList" element={<TargetedEventList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="Home__footer">
        <nav className='Home__footer-nav'>
          <a href="#" onClick={handleHomeClick}><MdHome className="icons" /></a>
          <a href="#" onClick={handleMyEventListClick}><MdOutlineCalendarToday className="icons" /></a>
          <a href="#" onClick={handleTargetedEventClick}><MdListAlt className="icons" /></a>
          <a href="#" onClick={handleProfileClick}><MdPermIdentity className="icons" /></a>
        </nav>

      </footer>
    </div> : <></>
}

export default Home

