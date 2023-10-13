import { useState, useEffect, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import retrieveHomeEvent from '../logic/retrieveHomeEvent'
import HomeEvent from './HomeEvent'
import './HomeEventList.sass'

function HomeEventList() {

  const logger = new Logger('HomeEventList')

  logger.info('call')

  const [events, setEvents] = useState(null)
  const { handleFeedback } = useContext(Context)
  const [reload, setReload] = useState(null)

  useEffect(() => {
    logger.info('componentDidMount | componentWillReceiveProps')

    loadEvents()
  }, [reload])

  const loadEvents = () =>
    retrieveHomeEvent(sessionStorage.token, (error, _events) => {
      if (error) {
        handleFeedback({ level: 'error', message: error.message })

        return
      }
      setEvents(_events)
    })

  const handleSignUpToEventClick = () => { setReload(Date.now()) }

  logger.info('render')

  // return events && events.length ?
  //   <ul className="EventList__list">
  //     {events.map(event => <li key={event.id}>
  //       <HomeEvent event={event} onSignUp={handleSignUpToEventClick} />
  //     </li>)}
  //   </ul>
  //   :
  //   <p className='EventList__p'>no event yet</p>
}

export default HomeEventList

