const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Event } = require('../models')
const { NotFoundError } = require('errors')
const retrieveOwnerEvent = require('./retrieveOwnerEvent')
const { expect } = require('chai')

describe('retrieveOwnerEvent', () => {
  before(() => connect('mongodb://127.0.0.1:27017/events-db-test'))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  describe('when ownerEvent already exists', () => {
    let owner

    beforeEach(() => {
      owner = new User({ name: 'Papa Gayo', email: 'papagayo@gmail.com', password: '1234' })

      return owner.save()
    })

    describe('when ownerEvent already has events', () => {
      let event1, event2, event3, allEvents

      beforeEach(() => {
        event1 = new Event({ ownerEvent: owner.id, title: 'event 1', description: 'test event 1', category: 'sport-activities' })
        event2 = new Event({ ownerEvent: owner.id, title: 'event 2', description: 'test event 2', category: 'social-activities' })
        event3 = new Event({ ownerEvent: owner.id, title: 'event 3', description: 'test event 3', category: 'environment' })

        return Promise.all([event1.save(), event2.save(), event3.save()])
          .then(events => allEvents = events)
      })

      it('succeeds on correct owner data', () =>
        retrieveOwnerEvent(owner.id)
          .then(events => {
            expect(events).to.be.instanceOf(Array)

            expect(events).to.have.lengthOf(3)

            events.forEach(event => {
              const found = allEvents.some(_event => {
                return _event.id === event.id && _event.title === event.title && event.description === event.description && _event.category === event.category
              })

              expect(found).to.be.true
            })
          })
      )
    })

    describe('when owner has no events', () => {
      it('succeeds on correct user data', () =>
        retrieveOwnerEvent(owner.id)
          .then(events => {
            expect(events).to.be.instanceOf(Array)

            expect(events).to.have.lengthOf(0)
          })
      )
    })

    it('fails on incorrect owner id', () => {
      const wrongId = new ObjectId().toString()

      return retrieveOwnerEvent(wrongId)
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`owner with id ${wrongId} does not exist`)
        })
    })
  })

  describe('when owner does not exist', () => {
    it('fails on unexisting user id', () => {
      const unexistingUserId = new ObjectId().toString()

      return retrieveOwnerEvent(unexistingUserId)
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`owner with id ${unexistingUserId} does not exist`)
        })
    })
  })

  afterEach(() => User.deleteMany())

  after(() => disconnect())
})