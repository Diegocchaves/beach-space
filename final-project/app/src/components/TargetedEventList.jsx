import { useState, useEffect, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import './MyEventList.sass'
import retrieveTargetedEvent from '../logic/retrieveTargetedEvent'
import TargetedEvent from './TargetedEvent'
import './TargetedEventList.sass'

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
    <div className='my-targeted-event-list-title-container'>
      <h1 className='my-targeted-event-list-title'>Events targeted</h1>
    </div>
    {events && events.length ?
      <div className='my-targeted-event-list-container'>
        <ul className="my-targeted-event-list-presentation">
          {events.map(event => <li key={event._id}>
            <TargetedEvent eventId={event._id} title={event.title} description={event.description} location={event.location} eventDate={event.eventDate} onRemove={handleRemoveEventTargeted} />
          </li>)}
        </ul>
      </div>
      :
      <p className='my-targeted-event-list-p'>no event yet</p>}
  </div>
}

export default TargetedEventList