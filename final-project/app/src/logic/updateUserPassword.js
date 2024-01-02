import Logger from 'loggy'
import { validateJwt, validatePassword } from 'validators'
import Apium from 'apium'

function updateUserPassword(token, password, newPassword, newPasswordRepeat, callback) {
  const logger = new Logger('updatePassword')

  logger.info('call')

  validateJwt(token)
  validatePassword(password, 'password')
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordRepeat, 'new password repeat')

  if (!password)
    throw new Error('el password es incorrecto!')

  if (password === newPassword)
    throw new Error('password and new password are the same!')

  if (newPassword !== newPasswordRepeat)
    throw new Error('new password and new password repeat are not the same!')

  logger.info('request')

  const api = new Apium(`${process.env.REACT_APP_API_URL}`)

  api.patch('users', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: newPassword })
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

export default updateUserPassword

