import Logger from 'loggy'
import Apium from 'apium'
import { validateJwt, validateStringNotEmptyNoSpaces } from 'validators'

function deleteTargetedEvent(token, eventId, callback) {
  const logger = new Logger('deleteEvent')

  logger.info('call')

  validateJwt(token)
  validateStringNotEmptyNoSpaces(eventId, 'eventId')

  const api = new Apium('http://localhost:8080/api')

  logger.info('request')

  api.delete(`/users/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }, (error, response) => {
    if (error) return callback(error)

    logger.info('response')

    const { status, payload } = response

    if (status >= 400 && status < 500) {
      const data = JSON.parse(payload)

      callback(new Error(data.error))
    } else if (status >= 500)
      callback(new Error('server error'))
    else if (status === 204) {
      callback(null)
    }
  })
}

export default deleteTargetedEvent