import { useContext } from 'react'
import React from 'react'
import Logger from 'loggy'
import Context from './Context'
import deleteUser from '../logic/deleteUser'
import { useNavigate } from 'react-router-dom'

function DeleteUser() {
  const logger = new Logger('DeleteUser')

  logger.info('call')

  const navigate = useNavigate()
  const { handleFeedback } = useContext(Context)

  const handleFormSubmit = event => {
    event.preventDefault()

    const password = event.target.password.value

    try {
      deleteUser(sessionStorage.token, password, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          return
        }
        delete sessionStorage.token
        navigate('/login')
      })

    } catch (error) {
      handleFeedback({ level: 'error', message: error.message })
    }
  }

  logger.info('render')

  return <div>

    <form className="delete-user-form" onSubmit={handleFormSubmit}>
      <input className="Input Input__light" type="password" name="password" placeholder="Password" />
      <button className="delete-user-buttom" >Delete User</button>
    </form>
  </div>
}
export default DeleteUser



