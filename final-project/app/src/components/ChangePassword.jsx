import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import updateUserPassword from '../logic/updateUserPassword'

function ChangePassword() {
  const logger = new Logger('ChangePassword')

  logger.info('call')

  const { handleFeedback } = useContext(Context)

  const handleSubmit = event => {
    event.preventDefault()

    const password = event.target.password.value
    const newPassword = event.target.newPassword.value
    const newPasswordRepeat = event.target.newPasswordRepeat.value

    try {
      updateUserPassword(sessionStorage.token, password, newPassword, newPasswordRepeat, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          return
        }

        handleFeedback({ level: 'success', message: 'Password saved' })
      })
    } catch (error) {
      handleFeedback({ level: 'error', message: error.message })
    }
  }

  logger.info('render')

  return <div>
    <form className="change-password-form" onSubmit={handleSubmit}>
      <input className="Input Input__light" type="password" name="password" placeholder="Current password" />
      <input className="Input Input__light" type="password" name="newPassword" placeholder="New password" />
      <input className="Input Input__light" type="password" name="newPasswordRepeat" placeholder="Repeat new password" />

      <button className="change-name-buttom">Save</button>
    </form>
  </div>
}

export default ChangePassword





