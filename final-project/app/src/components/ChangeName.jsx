import { useContext, useState } from 'react'
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
    const newLastName = event.target.lastName.value

    try {
      updateUserName(sessionStorage.token, newName, newLastName, error => {
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
    <form className="change-name-form" onSubmit={handleFormSubmit}>
      <div className='change-name-input-wrapper'>
        <div className='change-name-tittle'>
          <h4>First name</h4>
        </div>
        <div>
          <input className="input-light" type="text" name="name" placeholder="name" />
        </div>
      </div>
      <div className='change-name-input-wrapper'>
        <div className='change-name-tittle'>
          <h4>Last name</h4>
        </div>
        <div>
          <input className="input-light" type="text" name="lastName" placeholder="Last name" />
        </div>
      </div>

      <button className="change-name-buttom">Save</button>

    </form>
  </div>
}

export default ChangeName





















