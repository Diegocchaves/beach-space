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
      <div className='change-password-tittle'>
        <h4>Current password</h4>
      </div>
      <div>
        <input className="Input Input__light" type="password" name="password" placeholder="Current password" />
      </div>
      <div className='change-password-tittle'>
        <h4>New password</h4>
      </div>
      <div>
        <input className="Input Input__light" type="password" name="newPassword" placeholder="New password" />
      </div>
      <div className='change-password-tittle'>
        <h4>Repeat new password</h4>
      </div>
      <div>
        <input className="Input Input__light" type="password" name="newPasswordRepeat" placeholder="Repeat new password" />
      </div>
      <div className='change-password-buttom-wrapper'>
        <button className="change-password-buttom">Save</button>
      </div>
    </form>
  </div>
}

export default ChangePassword





