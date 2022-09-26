import Logger from 'loggy'
import Apium from 'apium'
import { validateString, validateEmail, validatePassword } from 'validators'

function registerUser(name, email, password, callback) {
  const logger = new Logger('registerUser')

  logger.info('call')

  validateString(name, 'name')
  validateEmail(email, 'email')
  validatePassword(password)

  logger.info('request')

  const api = new Apium('http://localhost:8080/api')

  api.post('users', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
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

