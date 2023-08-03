import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import authenticateUser from '../logic/authenticateUser'
import { isJwtValid } from 'validators'
import { MdMailOutline, MdLockOutline } from 'react-icons/md'


function Login(props) {
  const logger = new Logger('Login')

  logger.info('call')

  const { handleFeedback } = useContext(Context)

  const handleFormSubmit = event => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      authenticateUser(email, password)
        .then(token => {
          sessionStorage.token = token

          props.onUserLoggedIn()

        })
        .catch(error => handleFeedback({ level: 'error', message: 'wrong credentials' }))
    } catch (error) {
      handleFeedback({ level: 'error', message: error.message })
    }
  }
  const handleRegisterLinkClick = event => {
    event.preventDefault()

    props.onRegisterLinkClicked()
  }

  logger.info('render')
  // TODO: have so much containers here. try to put a container inside the big contanier and then divide it in two partes, one for the logo and other to the form.

  {/* Form container */ }
  return isJwtValid(sessionStorage.token) ? <></> : <div className='Form-container'>
    <div className='wrapper'>
      <div className='logo'>
        <img src="./bs-new.png" alt="" />
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className='row'>
          <i> <MdLockOutline /></i>
          <input type="text" name="email" placeholder="Email" required />
        </div>
        <div className='row'>
          <i> <MdMailOutline /></i>
          <input type="password" name="password" placeholder="Password" required />
        </div>

        {/* forgot password link */}
        <div className='pass'><a href="#">Forgot password?</a></div>

        {/* Login input */}
        <div className='row button'>
          <input type="submit" value='Login' />
        </div>

        {/* Register link */}
        <div className='signup-link'>Not a member? <a href="#" onClick={handleRegisterLinkClick}>Signup now</a></div>
      </form>
    </div>
  </div>


}

export default Login