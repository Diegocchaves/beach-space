import { useState, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import saveEvent from '../logic/saveEvent'
import { isJwtValid } from 'validators'
import './EventCreator.sass'
import { useNavigate } from 'react-router-dom'


function EventCreator() {
  const logger = new Logger('EventCreator')

  logger.info('call')

  const { handleFeedback } = useContext(Context)
  const navigate = useNavigate()

  const [image, setImage] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    // Handle the selected image file as needed
    setImage(file)
  }

  const handleSaveSubmit = event => {
    event.preventDefault()
    const { target: { title, description, location, eventDate } } = event

    const formData = new FormData()
    formData.append('image', image)

    saveEvent(sessionStorage.token, null, title.value, description.value, location.value, eventDate.value, formData, (error) => {
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
      <div className='event-creator-pag-container'>
        <h1 className='event-creator-pag'>Create Event</h1>
      </div>

      <form className="event-creator-form" onSubmit={handleSaveSubmit}>

        {/* Add image input */}
        <div className="event-creator-input-container">
          <label htmlFor="image">Event Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} />
        </div>

        <textarea className='input-light' type='text' name="title" placeholder="What the name of the event?"></textarea>

        <h5>Description</h5>
        <textarea className='event-creator-description' type='text' name="description" placeholder="Describe the event" />
        <div className='event-creator-input-container'>
          <textarea className='input-light' type="text" name='location' placeholder='Add the location of the event' />
        </div>
        <div className='event-creator-input-container'>
          <textarea className='input-light' type="text" name='eventDate' placeholder='Indicate the date and time of the event' />
        </div>

        <button className="event-creator-button">Save</button>

      </form>

    </div> : <></>
}

export default EventCreator



