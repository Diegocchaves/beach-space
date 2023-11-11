import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import deleteTargetedEvent from '../logic/deleteTargetedEvent'
import './TargetedEvent.sass'
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

  return <div className='my-targeted-event-container'>
    <div className='my-targeted-event-wrapper'>
      <p className='my-targeted-event-title'>{props.title}</p>
      <p className="my-targeted-event-description">{props.description}</p>
      <MdOutlineLocationOn className='EventHome__icons' />
      <p className='my-targeted-event-location'>{props.location}</p>
      < MdCalendarToday className='EventHome__icons' />
      <p className='my-targeted-event-date' >{props.eventDate}</p>

      <div className='my-targeted-event-button-container'>
        <button className="my-targeted-event-button" onClick={handleRemoveClick}>cancel</button>
      </div>
    </div>
  </div>
}

export default TargetedEvent