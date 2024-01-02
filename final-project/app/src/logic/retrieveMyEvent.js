import Logger from 'loggy'
import Apium from 'apium'
import { validateJwt } from 'validators'

function retrieveMyEvent(token, callback) {
  const logger = new Logger('retrieveOwnerEvent')

  logger.info('call')

  validateJwt(token)

  const api = new Apium(`${process.env.REACT_APP_API_URL}`)

  logger.info('request')

  api.get('events/owner', {
    headers: {
      Authorization: `Bearer ${token}`
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
    else if (status === 200) {
      const data = JSON.parse(payload)

      callback(null, data)
    }
  })
}

export default retrieveMyEvent