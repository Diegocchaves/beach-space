const { User } = require('../models')
const { AuthError } = require('errors')
const { validateEmail, validatePassword } = require('validators')

function authenticateUser(email, password) {
  validateEmail(email, 'email')
  validatePassword(password)

  return User.findOne({ email, password })
    .then(user => {
      if (!user)
        throw new AuthError('wrong credentials')

      return user.id
    })
}

module.exports = authenticateUser