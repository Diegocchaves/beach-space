import { useContext } from 'react'
import React from 'react'
import Logger from 'loggy'
import Context from './Context'
import updateUserName from '../logic/updateUserName'
import './Profile.sass'
import './Feedback.sass'

function ChangeName() {
  const logger = new Logger('ChangeName')

  logger.info('call')

  const { handleFeedback } = useContext(Context)

  const handleFormSubmit = event => {
    event.preventDefault()

    const newName = event.target.name.value

    try {
      updateUserName(sessionStorage.token, newName, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          return
        }
        handleFeedback({ level: 'success', message: 'name has been changed' })

      })
    } catch (error) {
      handleFeedback({ level: 'error', message: error.message })
    }
  }

  logger.info('render')

  return <div>
    <form className="ChangeName__form" onSubmit={handleFormSubmit}>
      <input className="Input Input--light" type="text" name="name" placeholder="name" />
      <button className="Button--no-border">Save</button>
    </form>
  </div>
}

export default ChangeName





















