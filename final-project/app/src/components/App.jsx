import { useEffect, useState } from 'react'
import Logger from 'loggy'
import Context from './Context'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Feedback from './Feedback'
import './App.sass'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { isJwtValid } from 'validators'

function App() {
  const logger = new Logger('App')

  logger.info('call')

  const [feedback, setFeedback] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isJwtValid(sessionStorage.token))
      navigate('/')
    else
      handleUserLogout()
  }, [])

  const handleUserRegistered = () => handleLoginNavigation()

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterNavigation = () => navigate('/register')

  const handleLoginNavigation = () => navigate('/login')

  const handleUserLogout = () => {
    delete sessionStorage.token

    handleLoginNavigation()
  }

  const handleFeedback = feedback => setFeedback(feedback)

  const handleFeedbackTimeout = () => setFeedback(null)

  logger.info('render')

  return <Context.Provider value={{ handleFeedback }}>
    <div>
      <Routes>
        <Route path="/*" element={<Home onUserLogout={handleUserLogout} />} />
        <Route path="/login" element={<Login onUserLoggedIn={handleUserLoggedIn} onRegisterLinkClicked={handleRegisterNavigation} />} />
        <Route path='/register' element={<Register onUserRegistered={handleUserRegistered} onLoginLinkClicked={handleLoginNavigation} />} />
      </Routes>
      {feedback && <Feedback level={feedback.level} message={feedback.message} onTimeout={handleFeedbackTimeout} />}
    </div>
  </Context.Provider>
}

export default App
