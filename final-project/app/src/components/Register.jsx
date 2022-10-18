import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import registerUser from '../logic/registerUser'
import { isJwtValid } from 'validators'

function Register(props) {
  const logger = new Logger('Register')

  logger.info('call')

  const { handleFeedback } = useContext(Context)

  const handleFormSubmit = event => {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      registerUser(name, email, password, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          return
        }
        props.onUserRegistered()
      })

    } catch (error) {
      handleFeedback({ level: 'error', message: error.message })
    }
  }

  const handleLoginLinkClick = event => {
    event.preventDefault()

    props.onLoginLinkClicked()
  }

  logger.info('render')

  return isJwtValid(sessionStorage.token) ? <></> : <div>

    <img className='Logo' src="./bs-logo.jpg" alt="" />

    <form className="Register__form" onSubmit={handleFormSubmit}>
      <input className="Input__register-login" type="text" name="name" placeholder="Name" />
      <input className="Input__register-login" type="text" name="email" placeholder="Email" />
      <input className="Input__register-login" type="password" name="password" placeholder="Password" />
      <button className="Button">Register</button>
      <a href="#" className='Button--no-border' onClick={handleLoginLinkClick}>Login</a>
    </form>
  </div>
}

export default Register