import { useState, useEffect, useContext } from 'react'
import Logger from 'loggy'
import Context from './Context'
import retrieveMyEvent from '../logic/retrieveMyEvent'
import MyEvent from './MyEvent'
import './MyEventList.sass'

function MyEventList({ timestamp }) {
  const logger = new Logger('MyEventList')

  logger.info('call')

  const [events, setEvents] = useState(null)
  const { handleFeedback } = useContext(Context)

  useEffect(() => {
    logger.info('componentDidMount | componentWillReceiveProps')

    loadEvents()
  }, [timestamp])

  const loadEvents = () =>
    retrieveMyEvent(sessionStorage.token, (error, events) => {
      if (error) {
        handleFeedback({ level: 'error', message: error.message })

        return
      }
      setEvents(events)
    })

  const handleRemoveEvent = eventId => {
    const _events = events.filter(event => event.id !== eventId)

    setEvents(_events)
  }

  logger.info('render')

  return <div>
    <h1 className='Description__pag'>My Events</h1>
    {events && events.length ?
      <ul className="myEventList__list">
        {events.map(event => <li key={event.id}>
          <MyEvent eventId={event.id} title={event.title} description={event.description} location={event.location} eventDate={event.eventDate} onRemove={handleRemoveEvent} />
        </li>)}
      </ul>
      :
      <p className='myEventList__p' >no event yet</p>}
  </div>

}

export default MyEventList