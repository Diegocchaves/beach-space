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
    handleFeedback({ level: 'success', message: 'You are in!' })
  }

  logger.info('render')
  //event container
  return <div>
    <div className='event-container'>
      <div className="event-wrapper">
        <div className='event-row'>
          <i><MdPeople /></i>
          <p className='event-participant'>Participants: {event.participants.length}</p>
        </div>

        <div className='event-row'><p className='event-title'>{event.title}</p></div>

        <div className='event-row'><p className='event-description'>{event.description}</p></div>

        <div className='event-row'>
          <i><MdOutlineLocationOn /></i>
          <p className='event-location'>{event.location}</p>
        </div>

        <div className='event-row'>
          <i>< MdCalendarToday /></i>
          <p className='event-date' >{event.eventDate}</p>
        </div>

        <div className='event-button'>
          <button className="button" onClick={handleSignUpToEventClick}>Sign up</button>
        </div>
      </div>
    </div>

  </div>
}

export default HomeEvent













