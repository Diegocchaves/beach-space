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
        handleFeedback({ level: 'success', message: 'event has been removed' })

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

  return <div className='MyEvent'>
    <form className="MyEvent__form" onSubmit={handleSaveSubmit}>

      <textarea className='MyEvent__title' type='text' name="title" placeholder="Titulo" defaultValue={props.title}></textarea>
      <textarea className="MyEvent__description" type='text' name="text" placeholder="Descripción" defaultValue={props.description}></textarea>
      <textarea className="MyEvent__location" type='text' name="location" placeholder="Localización" defaultValue={props.location}></textarea>
      <textarea className="MyEvent__date" type='text' name="eventDate" placeholder="Fecha" defaultValue={props.eventDate}></textarea>

      <div className='MyEvent__button-container'>
        <button className="MyEvent__event-button" onClick={handleRemoveClick}>cancel</button>
        <button className="MyEvent__event-button">Save</button>
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
