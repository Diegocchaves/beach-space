import Logger from 'loggy'
import Apium from 'apium'
import { validateString, validateEmail, validatePassword } from 'validators'

function registerUser(name, lastName, email, password, callback) {
  const logger = new Logger('registerUser')

  logger.info('call')

  validateString(name, 'name')
  validateString(lastName, 'lastName')
  validateEmail(email, 'email')
  validatePassword(password)

  logger.info('request')

  const api = new Apium(`${process.env.REACT_APP_API_URL}`)

  api.post('users', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, lastName, email, password })
  }, (error, { status, payload }) => {
    logger.info('response')

    if (error) {
      callback(error)

      return
    }

    if (status === 201) {
      callback(null)
    } else if (status >= 400 && status < 500) {

      logger.warn('response - client error status ' + status)

      const data = JSON.parse(payload)

      callback(new Error(data.error))
    } else {
      logger.error('response - server error status ' + status)

      callback(new Error('server error'))
    }
  })
}
export default registerUser

