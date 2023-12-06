import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import registerUser from '../logic/registerUser'
import { isJwtValid } from 'validators'
import { MdMailOutline, MdLockOutline, MdPersonOutline } from 'react-icons/md'

function Register(props) {
  const logger = new Logger('Register')

  logger.info('call')

  const { handleFeedback } = useContext(Context)

  const handleFormSubmit = event => {
    event.preventDefault()

    const name = event.target.name.value
    const lastName = event.target.lastName.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      registerUser(name, lastName, email, password, error => {
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

  return isJwtValid(sessionStorage.token) ? <></> : <div className='container'>
    <div className='wrapper'>
      <div className='logo'>
        <img src="./bs-new.png" alt="" />
      </div>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className='row'>
          <i><MdPersonOutline /></i>
          <input type="text" name="name" placeholder="Name" />
        </div>

        <div className='row'>
          <i><MdPersonOutline /></i>
          <input type="text" name="lastName" placeholder="Last name" />
        </div>

        <div className='row'>
          <i><MdMailOutline /></i>
          <input type="text" name="email" placeholder="Email" />
        </div>

        <div className='row'>
          <i><MdLockOutline /></i>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div className='row button'>
          <input type="submit" value='Register' />
        </div>


        <div className='signin-link'>Join us! <a href="#" onClick={handleLoginLinkClick}>Login</a></div>
      </form>
    </div>

  </div>
}

export default Register