const { expect } = require('chai')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { NotFoundError } = require('errors')
const { User, Event } = require('../models')
const deleteTargetedEvent = require('./deleteTargetedEvent')

describe('deleteTargetedEvent', () => {
  before(() => connect('mongodb://127.0.0.1:27017/users-db-test'))

  beforeEach(() => User.deleteMany())
  beforeEach(() => Event.deleteMany())

  describe('when user already exists', () => {
    let diegoUser, crisUser

    beforeEach(() => {
      crisUser = new User({ name: 'Cris', email: 'cris@gmail.com', password: '1234' })
      // brunoUser = new User({ name: 'Bruno', email: 'bruno@gmail.com', password: '1234' })
      diegoUser = new User({ name: 'Diego', email: 'diego1@gmail.com', password: '1234' })

      return Promise.all([diegoUser.save()])
    })

    describe('when user already has events', () => {
      let event1, event2, event3, allEvents

      beforeEach(() => {
        event1 = new Event({ owner: crisUser.id, title: 'event 1', description: 'test event 1', category: 'sport-activities' })
        event2 = new Event({ owner: crisUser.id, title: 'event 2', description: 'test event 2', category: 'social-activities' })
        event3 = new Event({ owner: crisUser.id, title: 'event 3', description: 'test event 3', category: 'environment' })

        return Promise.all([event1.save(), event2.save(), event3.save()])
          .then(events => {
            allEvents = events
            diegoUser.events.push(...allEvents.map(event => event._id))

            return diegoUser.save()
          })
      })
      debugger
      it('succeeds on correct data ', () => {
        return deleteTargetedEvent(diegoUser.id, event1.id)
          .then(result => {
            expect(result).to.be.undefined

            return User.findById(diegoUser.id)
          })
          .then((user) => {
            const exist = user.events.some(_eventId => _eventId._id.toString() === event1.id)

            expect(exist).to.be.false

            return Event.findById(event1.id)
              .then(event => {
                const _exist = event.participants.find(_userId => _userId._id.toString() === diegoUser.id)

                expect(_exist).to.be.undefined
              })
          })
      })

      it('fails when event id does not exist', () => {
        const wrongId = new ObjectId().toString()

        return deleteTargetedEvent(diegoUser.id, wrongId)
          .then(() => {
            throw new Error('it should not reach this point')
          })
          .catch(error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`event with id ${wrongId} not found`)
          })
      })

      afterEach(() => User.deleteMany())
      after(() => disconnect())
    })
  })
})


