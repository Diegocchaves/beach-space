import { useContext } from 'react';
import Logger from 'loggy';
import Context from './Context';
import signUpToEvent from '../logic/signUpToEvent';
import './HomeEvent.sass';
import { MdPeople, MdOutlineLocationOn, MdCalendarToday } from 'react-icons/md';

function HomeEvent(props) {
  const logger = new Logger('HomeEvent');
  logger.info('call');

  const { handleFeedback } = useContext(Context);
  const { event, onSignUp } = props;

  const handleSignUpToEventClick = () => {
    if (event.id) {
      signUpToEvent(sessionStorage.token, event.id, (error) => {
        if (error) {
          handleFeedback({ level: 'error', message: error.message });
          return;
        }
        onSignUp();
      });
    }
    handleFeedback({ level: 'success', message: 'You are in!' });
  };

  logger.info('render');

  return (
    <div className="home-event-card">
      <div className="home-event-image-container">
        <img
          className="home-event-image"
          src={event.imageURL || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
          alt="Event Image"
        />
      </div>

      <div className="home-event-content">
        <div className="home-event-title">{event.title}</div>

        <div className="home-event-description">{event.description}</div>

        <div className="home-event-details">
          <div className="home-event-detail">
            <MdPeople />
            <p className="home-event-participant">Participants: {event.participants.length}</p>
          </div>

          <div className="home-event-detail">
            <MdOutlineLocationOn />
            <p className="home-event-location">{event.location}</p>
          </div>

          <div className="home-event-detail">
            <MdCalendarToday />
            <p className="home-event-date">{event.eventDate}</p>
          </div>
        </div>

        <button className="home-event-button" onClick={handleSignUpToEventClick}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default HomeEvent;









