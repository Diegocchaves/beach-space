const { User } = require('../models')
const { NotFoundError } = require('errors')
const { validateStringNotEmptyOrBlank, validateEmail, validateStringNotEmptyNoSpaces, validatePassword } = require('validators')

function updateUser(userId, name, lastName, email, password) {
  validateStringNotEmptyNoSpaces(userId)
  if (name != null) validateStringNotEmptyOrBlank(name, 'name')
  if (lastName != null) validateStringNotEmptyOrBlank(lastName, 'lastName')
  if (email != null) validateEmail(email, 'email')
  if (password != null) validatePassword(password, 'password')

  return User.updateOne({ _id: userId }, { $set: { name, lastName, email, password } })
    .then((result) => {
      if (result.matchedCount === 0)
        throw new NotFoundError(`user with id ${userId} does not exist`)
    })
}

module.exports = updateUser



