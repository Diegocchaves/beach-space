import { useState, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import saveEvent from '../logic/saveEvent'
import { isJwtValid } from 'validators'
import './EventCreator.sass'
import { useNavigate } from 'react-router-dom'
import { MdOutlineLocationOn, MdCalendarToday } from "react-icons/md"

function EventCreator() {
  const logger = new Logger('EventCreator')

  logger.info('call')

  const { handleFeedback } = useContext(Context)
  const navigate = useNavigate()

  const handleSaveSubmit = event => {
    event.preventDefault()

    const { target: { title: { value: title } } } = event
    const { target: { description: { value: description } } } = event
    const { target: { location: { value: location } } } = event
    const { target: { eventDate: { value: eventDate } } } = event


    saveEvent(sessionStorage.token, null, title, description, location, eventDate, error => {
      if (error) {
        handleFeedback({ level: 'error', message: error.message })

        return
      }
      handleFeedback({ level: 'success', message: 'event saved' })
      navigate('/')
    })
  }

  logger.info('render')

  return isJwtValid(sessionStorage.token) ?
    <div className="event-creator-container">
      <form className="event-creator-form" onSubmit={handleSaveSubmit}>
        <h1 className='event-creator-pag'>Create Event</h1>

        <h5>Name of the event</h5>
        <textarea className='event-creator-title' type='text' name="title" placeholder="What the name of the event?"></textarea>

        <h5>Description</h5>
        <textarea className='event-creator-description' type='text' name="description" placeholder="Describe the event" />
        <div className='event-creator-input-container'>
          <i className='event-creator-icon'><MdOutlineLocationOn /></i>
          <textarea className='event-creator-input' type="text" name='location' placeholder='Add the location of the event' />
        </div>
        <div className='event-creator-input-container'>
          <i className='event-creator-icon'> <MdCalendarToday /></i>
          <textarea className='event-creator-input' type="text" name='eventDate' placeholder='Indicate the date and time of the event' />
        </div>

        <button className="event-creator-button">Save</button>

      </form>

    </div> : <></>
}

export default EventCreator



