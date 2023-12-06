const { User } = require('../models')
const { ConflictError } = require('errors')
const { validateStringNotEmptyOrBlank, validateEmail, validatePassword } = require('validators')

function registerUser(name, lastName, email, password) {
  validateStringNotEmptyOrBlank(name, 'name')
  validateStringNotEmptyOrBlank(lastName, 'lastName')
  validateEmail(email, 'email')
  validatePassword(password)

  return User.create({ name, lastName, email, password })
    .then(() => { })
    .catch(error => {
      console.log(error)
      if (error.code = 11000)
        throw new ConflictError(`user with email ${email} already exists`)

      throw error
    })
}

module.exports = registerUser

// No sabemos de cliente
// sabemos de mongoose