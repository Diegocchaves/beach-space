import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import deleteEvent from '../logic/deleteEvent'
import saveEvent from '../logic/saveEvent'
import './MyEvent.sass'
import { useNavigate } from 'react-router-dom'

function MyEvent(props) {
  const logger = new Logger('MyEvent')
  logger.info('call')

  const { handleFeedback } = useContext(Context)
  const navigate = useNavigate()
  const { eventId, onRemove } = props

  const handleRemoveClick = () => {
    if (eventId)
      deleteEvent(sessionStorage.token, eventId, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          return
        }

        onRemove(eventId)
        handleFeedback({ level: 'success', message: 'Event has been removed!' })

      })
  }

  const handleSaveSubmit = event => {
    event.preventDefault()

    const { eventId } = props
    const { target: { title: { value: title } } } = event
    const { target: { text: { value: description } } } = event
    const { target: { location: { value: location } } } = event
    const { target: { eventDate: { value: eventDate } } } = event

    saveEvent(sessionStorage.token, eventId, title, description, location, eventDate, error => {
      if (error) {
        handleFeedback({ level: 'error', message: error.message })

        return
      }
      navigate('/')

    })
  }

  logger.info('render')

  return <div className='my-event-container'>
    <form className="my-event-form" onSubmit={handleSaveSubmit}>

      <input className='my-event-title' type='text' name="title" placeholder="Titulo" defaultValue={props.title}></input>
      <textarea className="my-event-description" type='text' name="text" placeholder="Descripción" defaultValue={props.description}></textarea>
      <input className="my-event-location" type='text' name="location" placeholder="Localización" defaultValue={props.location}></input>
      <input className="my-event-date" type='text' name="eventDate" placeholder="Fecha" defaultValue={props.eventDate}></input>

      <div className='my-event-button-container'>
        <button className="my-event-event-button" onClick={handleRemoveClick}>Cancel</button>
        <button className="my-event-event-button">Save</button>
      </div>

    </form>
  </div>
}

export default MyEvent



{/* <select name='select'>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
</select> */}

{/* <figure className=''>
                <img src="hola" alt="" />
            </figure> */}
