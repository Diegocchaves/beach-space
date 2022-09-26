const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Event } = require('../models')
const retrieveTargetedEvent = require('./retrieveTargetedEvent')
const { expect } = require('chai')

describe('retrieveTargetedEvent', () => {
  before(() => connect('mongodb://127.0.0.1:27017/users-db-test'))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  describe('when user already exists', () => {
    let user

    beforeEach(() => {
      user = new User({ name: 'Papa Gayo', email: 'papagayo@gmail.com', password: '1234' })

      return user.save()
    })

    describe('when user already has events', () => {
      let event1, event2, event3, allEvents

      beforeEach(() => {
        event1 = new Event({ owner: user.id, title: 'event 1', description: 'test event 1', category: 'sport-activities' })
        event2 = new Event({ owner: user.id, title: 'event 2', description: 'test event 2', category: 'social-activities' })
        event3 = new Event({ owner: user.id, title: 'event 3', description: 'test event 3', category: 'environment' })

        return Promise.all([event1.save(), event2.save(), event3.save()])
          .then(events => {
            allEvents = events
            return user.events.push(...allEvents.map(event => event._id))
          })
          .then(() => {
            return user.save()
          })
      })

      it('succeeds on correct user data', () =>
        retrieveTargetedEvent(user.id, event1.id)
          .then(events => {
            expect(events).to.be.instanceOf(Array)

            expect(events).to.have.lengthOf(3)

            events.forEach(_event => {
              const found = allEvents.some(_event => {
                return _event.id === event1.id && _event.title === event1.title && _event.description === event1.description && _event.category === event1.category
              })

              expect(found).to.be.true
            })
          })
      )
    })
  })

  afterEach(() => User.deleteMany())

  after(() => disconnect())
})