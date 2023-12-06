const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Event } = require('../models')
const { ConflictError } = require('errors')
const addEventToUser = require('./addEventToUser')
const { expect } = require('chai')

describe('addEventToUser', () => {
  before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  describe('when user already exists', () => {
    let diegoUser

    beforeEach(() => {
      diegoUser = new User({ name: 'Diego', lastName: 'Carvalho', email: 'diegocarve@gmail.com', password: '1234' })

      return diegoUser.save()

    })
    describe('when event exists', () => {
      let event

      beforeEach(() => {
        event = new Event({ user: diegoUser.id, title: 'Samba Brasil', description: "test" })

        return event.save()
      })

      it('succeeds on correct data ', () => {
        return addEventToUser(event.id, diegoUser.id)
          .then(() => {
            return User.findById(diegoUser.id)
              .then(user => {
                const exists = user.events.some(function (eventId) {
                  return eventId.toString() === event.id
                })

                expect(exists).to.be.true
              })
          })
      })

      describe('when user already has event', () => {
        beforeEach(() => {
          diegoUser.events.push(event.id)

          return diegoUser.save()
        })

        it('fail when try signup in the same event ', () => {
          return addEventToUser(event.id, diegoUser.id)
            .then(() => {
              throw new Error('should not reach this point')
            })
            .catch(error => {
              expect(error).to.exist

              expect(error).to.be.instanceOf(ConflictError)
              expect(error.message).to.equal(`event with id ${event.id} already signed up.`)
            })
        })
      })
    })
  })

  describe('addUsertoEvent', () => {
    let jordiUser

    beforeEach(() => {
      jordiUser = new User({ name: 'Jordi', lastName: 'Shefer', email: 'jordishefer@gmail.com', password: '1234' })

      return jordiUser.save()

    })
    describe('when event exists', () => {
      let event

      beforeEach(() => {
        event = new Event({ user: jordiUser.id, title: 'Olá!', description: "test jordi" })

        return event.save()
      })

      it('succeeds on correct data', () => {
        return addEventToUser(event.id, jordiUser.id)
          .then(() => {
            return Event.findById(event.id)
              .then(event => {
                const exists = event.participants.some(function (userId) {
                  return (userId.toString() === jordiUser.id)
                })

                expect(exists).to.be.true
              })
          })
      })
      describe('when event already has participant', () => {
        beforeEach(() => {
          event.participants.push(jordiUser.id)

          return event.save()
        })

        it('fail when same participant already signed Up the same event ', () => {
          return addEventToUser(event.id, jordiUser.id)
            .then(() => {
              throw new Error('should not reach this point')
            })
            .catch(error => {
              expect(error).to.exist

              expect(error).to.be.instanceOf(ConflictError)
              expect(error.message).to.equal(`user with id ${jordiUser.id} already signed up.`)
            })
        })
      })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
  })
})




