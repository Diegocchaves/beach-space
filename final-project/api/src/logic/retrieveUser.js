const { User } = require('../models')
const { NotFoundError } = require('errors')
const { validateStringNotEmptyNoSpaces } = require('validators')
debugger
function retrieveUser(userId) {
  validateStringNotEmptyNoSpaces(userId)

  return User.findById(userId).lean()
    .then(user => {
      if (!user)
        throw new NotFoundError(`user with id ${userId} does not exist`)

      delete user._id
      delete user.__v
      delete user.password

      return user
    })
}

module.exports = retrieveUser