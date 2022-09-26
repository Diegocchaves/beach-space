const { User, Event } = require('../models')
const { NotFoundError } = require('errors')
const { validateStringNotEmptyNoSpaces, validateString } = require('validators')

function createEvent(userId, title, description, location, eventDate) {
  validateStringNotEmptyNoSpaces(userId, 'userId')
  if (title != null) validateString(title, 'title')
  if (description != null) validateString(description, 'description')
  if (description != null) validateString(location, 'location')
  if (description != null) validateString(eventDate, 'eventDate')

  return User.findById(userId)//user creator
    .then(user => {
      if (!user) throw new NotFoundError(`ownerEvent with id ${userId} does not exist`)

      return Event.create({ ownerEvent: userId, title, description, location, eventDate })
    })
    .then(event => event.id)
}

module.exports = createEvent