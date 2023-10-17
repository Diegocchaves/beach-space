import { useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import signUpToEvent from '../logic/signUpToEvent'
import './HomeEvent.sass'
import { MdPeople, MdOutlineLocationOn, MdCalendarToday } from "react-icons/md"

function HomeEvent(props) {
  const logger = new Logger('HomeEvent')
  logger.info('call')

  const { handleFeedback } = useContext(Context)
  const { event, onSignUp } = props

  const handleSignUpToEventClick = () => {
    if (event.id)
      signUpToEvent(sessionStorage.token, event.id, error => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message })
          return

        }
        onSignUp()
      })
    handleFeedback({ level: 'success', message: 'Apuntado' })
  }

  logger.info('render')
  //event container
  return <div>
    <div className='event-container'>
      <div className="event-form">
        <i><MdPeople /></i>
        <p className='event-participant'>Participants: {event.participants.length}</p>
        <p className='event-title'>{event.title}</p>
        <p className='event-description'>{event.description}</p>
        <i><MdOutlineLocationOn /></i>
        <p className='event-location'>{event.location}</p>
        <i>< MdCalendarToday /></i>
        <p className='event-date' >{event.eventDate}</p>

        <div className='event-button'>
          <button className="button" onClick={handleSignUpToEventClick}>Sign up</button>
        </div>
      </div>
    </div>

  </div>
}

export default HomeEvent













