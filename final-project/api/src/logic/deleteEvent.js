const { NotFoundError } = require("errors");
const { Event, User } = require("../models");
const { validateStringNotEmptyOrBlank } = require('validators');


function deleteEvent(userId, eventId) {
  validateStringNotEmptyOrBlank(userId, 'user id')
  validateStringNotEmptyOrBlank(eventId, 'event id')

  return User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError(`owner id ${userId} does not found`)

      return Event.findById(eventId)
    })
    .then((event) => {
      if (!event) throw new NotFoundError(`event with id ${eventId} does not exist`)

      return Event.deleteOne({ _id: eventId, owner: userId })
    })
    .then(() => { })
}

module.exports = deleteEvent