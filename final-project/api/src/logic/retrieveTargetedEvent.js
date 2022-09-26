const { User } = require('../models')
const { NotFoundError } = require('errors')
const { validateStringNotEmptyNoSpaces } = require('validators')

//TargetedEventList
function retrieveTargetedEvent(userId) {
  validateStringNotEmptyNoSpaces(userId, 'user id')

  return User.findById(userId).populate('events').lean()
    .then(user => {
      if (!user)
        throw new NotFoundError(`user with id ${userId} does not exist`)

      return user.events
    })
    .then(events => {
      return events
    })

}

module.exports = retrieveTargetedEvent