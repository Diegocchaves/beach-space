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

  return <div>
    <div className="EventHome__form">
      <MdPeople className='EventHome__participantsIcons' />
      <p className='EventHome__participants'>Participantes: {event.participants.length}</p>
      <p className='EventHome__title'>{event.title}</p>
      <p className='EventHome__description'>{event.description}</p>
      <MdOutlineLocationOn className='EventHome__icons' />
      <p className='EventHome__location'>{event.location}</p>
      < MdCalendarToday className='EventHome__icons' />
      <p className='EventHome__date' >{event.eventDate}</p>

      <div className='EventHome__contanier-button'>
        <button className="EventHome__button" onClick={handleSignUpToEventClick}>Apuntarme</button>
      </div>

    </div>
  </div>
}

export default HomeEvent













