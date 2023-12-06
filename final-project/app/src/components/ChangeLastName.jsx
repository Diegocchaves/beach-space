import { useContext, useState } from 'react'
import React from 'react'
import Logger from 'loggy'
import Context from './Context'
import updateUserLastName from '../logic/updateUserLastName'
import './Profile.sass'
import './Feedback.sass'

function ChangeLastName() {
  const logger = new Logger('ChangeLastName')

  logger.info('call')

  const { handleFeedback } = useContext(Context)

  const handleFormSubmit = event => {
    event.preventDefault()

    const newLastName = event.target.lastName.value

    try {
      updateUserLastName(sessionStorage.token, newLastName, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          return
        }
        handleFeedback({ level: 'success', message: 'Last name has been changed' })

      })
    } catch (error) {
      handleFeedback({ level: 'error', message: error.message })
    }
  }

  logger.info('render')

  return <div>
    <form className="ChangeName__form" onSubmit={handleFormSubmit}>
      <input className="Input Input--light" type="text" name="lastName" placeholder="Last name" />
      <button className="Button--no-border">Save</button>
    </form>
  </div>
}

export default ChangeLastName





















