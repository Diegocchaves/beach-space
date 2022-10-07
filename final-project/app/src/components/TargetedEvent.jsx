import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import deleteTargetedEvent from '../logic/deleteTargetedEvent'
import './MyEvent.sass'
import { MdOutlineLocationOn, MdCalendarToday } from "react-icons/md"

function TargetedEvent(props) {
  const logger = new Logger('TargetedEvent')
  logger.info('call')

  const { handleFeedback } = useContext(Context)

  const { eventId, onRemove } = props

  const handleRemoveClick = () => {
    if (eventId)
      deleteTargetedEvent(sessionStorage.token, eventId, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })

          return
        }

        onRemove(eventId)
        handleFeedback({ level: 'success', message: 'event has been removed' })
      })
  }

  logger.info('render')

  return <div className='MyEvent'>
    <p className='MyEvent__title'>{props.title}</p>
    <p className="MyEvent__description">{props.description}</p>
    <MdOutlineLocationOn className='EventHome__icons' />
    <p className='EventHome__location'>{props.location}</p>
    < MdCalendarToday className='EventHome__icons' />
    <p className='EventHome__date' >{props.eventDate}</p>

    <div className='MyEvent__button-container'>
      <button className="MyEvent__event-button" onClick={handleRemoveClick}>cancel</button>
    </div>
  </div>
}

export default TargetedEvent