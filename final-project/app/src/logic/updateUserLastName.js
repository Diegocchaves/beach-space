import Logger from 'loggy'
import Apium from 'apium'
import { validateJwt, validateString } from 'validators'

function updateUserLastName(token, newLastName, callback) {
  const logger = new Logger('updateUserLastName')

  logger.info('call')

  validateJwt(token)
  validateString(newLastName, 'newLastName')

  logger.info('request')

  const api = new Apium('http://localhost:8080/api')
  api.patch('users', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lastName: newLastName })
  }, (error, response) => {
    if (error) return callback(error)

    logger.info('response')

    const { status, payload } = response

    if (status >= 400 && status < 500) {
      const data = JSON.parse(payload)

      callback(new Error(data.error))
    } else if (status >= 500)
      callback(new Error('server error'))
    else if (status === 204)
      callback(null)
  })
}
export default updateUserLastName
