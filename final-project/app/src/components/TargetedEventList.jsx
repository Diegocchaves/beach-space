import { useState, useEffect, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import './MyEventList.sass'
import retrieveTargetedEvent from '../logic/retrieveTargetedEvent'
import TargetedEvent from './TargetedEvent'

function TargetedEventList() {
  const logger = new Logger('TargetedEventList')

  logger.info('call')

  const [events, setEvents] = useState(null)
  const { handleFeedback } = useContext(Context)
  const [reload, setReload] = useState(null)

  useEffect(() => {
    logger.info('componentDidMount | componentWillReceiveProps')

    loadEvents()
  }, [reload])

  const loadEvents = () =>
    retrieveTargetedEvent(sessionStorage.token, (error, events) => {
      if (error) {
        handleFeedback({ level: 'error', message: error.message })

        return
      }
      setEvents(events)
    })

  const handleRemoveEventTargeted = eventId => {
    const _events = events.filter(event => event.id !== eventId)

    setEvents(_events)
    setReload(Date.now())
  }

  logger.info('render')

  return <div>
    <h1 className='Description__pag'>Eventos apuntados</h1>
    {events && events.length ?
      <ul className="myEventList__list">
        {events.map(event => <li key={event._id}>
          <TargetedEvent eventId={event._id} title={event.title} description={event.description} location={event.location} eventDate={event.eventDate} onRemove={handleRemoveEventTargeted} />
        </li>)}
      </ul>
      :
      <p className='myEventList__p'>no event yet</p>}
  </div>
}

export default TargetedEventList