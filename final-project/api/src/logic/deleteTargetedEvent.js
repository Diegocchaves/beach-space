const { NotFoundError } = require("errors")
const { validateStringNotEmptyNoSpaces } = require('validators')
const { User, Event } = require('../models')
debugger
function deleteTargetedEvent(userId, eventId) {
  validateStringNotEmptyNoSpaces(userId, 'user id')
  validateStringNotEmptyNoSpaces(eventId, 'event id')

  return Promise.all([User.findById(userId), Event.findById(eventId)])
    .then(([user, event]) => {
      if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)
      if (!event) throw new NotFoundError(`event with id ${eventId} not found`)

      const eventsIndex = user.events.findIndex(_eventId => _eventId.toString() === eventId)
      if (eventsIndex === -1) throw new NotFoundError(`event with id ${eventId} does not exist`)

      const participantsIndex = event.participants.findIndex(_userId => _userId.toString() === userId)
      if (participantsIndex === -1) throw new NotFoundError(`user with id ${userId} does not exist`)

      user.events.splice(eventsIndex, 1)
      event.participants.splice(participantsIndex, 1)

      return Promise.all([user.save(), event.save()])

    })
    .then(() => { })

}

module.exports = deleteTargetedEvent




/* return User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError(`user id ${userId} does not found`)

      const index = user.events.findIndex(_eventId => _eventId.toString() === eventId)
      if (index === -1) throw new NotFoundError(`event with id ${eventId} does not exist`)

      user.events.splice(index, 1)

      return user.save()
    })
    .then(() => {
      return Event.findById(eventId)
    })
    .then((event) => {
      if (!event) throw new NotFoundError(`event id ${eventId} does not found`)

      const index = event.participants.findIndex(_userId => _userId.toString() === userId)
      if (index === -1) throw new NotFoundError(`user with id ${userId} does not exist`)

      event.participants.splice(index, 1)

      return event.save()
    }) */