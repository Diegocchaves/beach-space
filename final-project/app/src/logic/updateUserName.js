import Logger from 'loggy'
import Apium from 'apium'
import { validateJwt, validateString } from 'validators'

function updateUserName(token, newName, newLastName, callback) {
  const logger = new Logger('updateUserName')

  logger.info('call')

  validateJwt(token)
  validateString(newName, 'newName')
  validateString(newLastName, 'newLastName')

  logger.info('request')

  const api = new Apium(`${process.env.REACT_APP_API_URL}`)

  api.patch('users', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newName, lastName: newLastName })
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
export default updateUserName
