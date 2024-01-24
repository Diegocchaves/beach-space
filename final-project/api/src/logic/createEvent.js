const { User, Event } = require('../models')
const { NotFoundError } = require('errors')
const { validateStringNotEmptyNoSpaces, validateString } = require('validators')

function createEvent(userId, title, description, location, eventDate, image) {
  validateStringNotEmptyNoSpaces(userId, 'userId')
  if (title != null) validateString(title, 'title')
  if (description != null) validateString(description, 'description')
  if (location != null) validateString(location, 'location')
  if (eventDate != null) validateString(eventDate, 'eventDate')
  // if (image != null) validateString(image, 'image')

  return User.findById(userId)//user creator
    .then(user => {
      if (!user) throw new NotFoundError(`ownerEvent with id ${userId} does not exist`)

      return Event.create({ ownerEvent: userId, title, description, location, eventDate, image })
    })
    .then(event => event.id)
}

module.exports = createEvent