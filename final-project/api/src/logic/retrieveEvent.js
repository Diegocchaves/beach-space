const { User, Event } = require('../models')
const { NotFoundError } = require('errors')
const { validateStringNotEmptyNoSpaces } = require('validators')

//HomeEventList
function retrieveEvent(userId) {
  validateStringNotEmptyNoSpaces(userId, 'user id')

  return User.findById(userId).lean()
    .then(user => {
      if (!user)
        throw new NotFoundError(`user with id ${userId} does not exist`)

      return Event.find().populate('participants').lean()
    })
    .then(events => {
      events.forEach(event => {
        event.id = event._id.toString()
        delete event._id
        delete event.__v
      })

      return events
    })

}

module.exports = retrieveEvent