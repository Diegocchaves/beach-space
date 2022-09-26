import Logger from 'loggy'
import Apium from 'apium'
import { validateJwt, validatePassword } from 'validators'

function deleteUser(token, password, callback) {
  const logger = new Logger('deleteUser')

  logger.info('call')

  validateJwt(token)
  validatePassword(password)

  logger.info('request')

  const api = new Apium('http://localhost:8080/api')

  api.delete(`users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  },
    (error, { status, payload }) => {
      if (error) return callback(error)

      logger.info('response')

      if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        callback(new Error(data.error))

      } else if (status >= 500)
        callback(new Error('server error'))

      if (status === 204)
        callback(null)
    })
}
export default deleteUser
