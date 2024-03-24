import Logger from 'loggy'
import Apium from 'apium'
import { validateDate, validateJwt, validateString, validateStringNotEmptyNoSpaces } from 'validators'

function saveEvent(token, eventId, title, description, location, eventDate, formData, callback) {
  const logger = new Logger('saveEvent')

  logger.info('call')

  validateJwt(token, 'token')
  // validateStringNotEmptyNoSpaces(eventId, 'eventID')
  validateString(title, 'title')
  validateString(description, 'description')
  validateString(location, 'location')
  validateString(eventDate, 'eventDate')
  // validateString(image, 'image')

  logger.info('request')

  const api = new Apium(`${process.env.REACT_APP_API_URL}`)

  const _body = {
    title,
    description,
    location,
    eventDate
  }
  if (!eventId) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const options = {
      headers,
      body: _body, formData,
    }
    api.post('events', options, (error, response) => {
      if (error) return callback(error)

      logger.info('response')

      const { status, payload } = response

      if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        callback(new Error(data.error))
      } else if (status >= 500)
        callback(new Error('server error'))
      else if (status === 201) {
        callback(null)
      }
    })

  } else {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const options = {
      headers,
      body: _body, formData,
    }

    api.patch(`events/${eventId}`, options, (error, response) => {
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
}

export default saveEvent