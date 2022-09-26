const { User, Event } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { validateStringNotEmptyNoSpaces } = require('validators')

function addEventToUser(eventId, userId) {
  validateStringNotEmptyNoSpaces(eventId)
  validateStringNotEmptyNoSpaces(userId)

  return Promise.all([Event.findById(eventId), User.findById(userId)])
    .then(([event, user]) => {
      if (!event) throw new NotFoundError(`event with id ${eventId} not found`)
      if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

      const eventIdAlreadyExists = user.events.some(_eventId => _eventId.toString() === eventId)
      if (eventIdAlreadyExists) throw new ConflictError(`event with id ${eventId} already signed up.`)

      const participantIdAlreadyExists = event.participants.some(_userId => _userId.toString() === userId)
      if (participantIdAlreadyExists) throw new ConflictError(`user with id ${userId} already signed up.`)

      user.events.push(eventId)
      event.participants.push(userId)

      return Promise.all([user.save(), event.save()])
    })
    .then(() => { })
}

module.exports = addEventToUser