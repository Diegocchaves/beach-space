const { expect } = require('chai')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { NotFoundError } = require('errors')
const { User, Event } = require('../models')
const deleteEvent = require('./deleteEvent')


describe('deleteEvent', () => {
  before(() => connect('mongodb://127.0.0.1:27017/events-db-test'))

  beforeEach(() => User.deleteMany())
  beforeEach(() => Event.deleteMany())

  describe('when user already exists', () => {
    let userId

    beforeEach(() => {
      return User.create({ name: 'Nathy Girl', email: 'nath@gmail.com', password: '1234' })
        .then((user) => {
          userId = user.id

        })
    })

    it('succeeds events and correct credentials', () => {
      let eventId

      return Event.create({ owner: userId, photo: 'https://www.upsurfboard.com/wp-content/uploads/2019/05/Barceloneta-Playa-Surf-1.jpg', title: 'After Work Mar Bella', description: 'Únete a nosotros si quieres  disfrutar...', direction: 'https://goo.gl/maps/WqUnzYRVKLB2A4jE9', category: 'sport-activities' })
        .then((result) => {
          eventId = result.id

          return deleteEvent(userId, eventId)
        })
        .then((result) => {
          expect(result).to.be.undefined

          return Event.findById(eventId)

        })
        .then((event) => {
          expect(event).to.be.null
        })
    })

    it('fails when event id does not exist', () => {
      const wrongId = new ObjectId().toString()

      return deleteEvent(userId, wrongId)
        .then(() => {
          throw new Error('it should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`event with id ${wrongId} does not exist`)
        })
    })

  })

  describe('When owner does not exist', () => {

    it('fails with wrong owner Id', () => {
      const wrongId = new ObjectId().toString()
      const userId = new ObjectId().toString()

      let eventId
      return Event.create({ owner: userId, photo: 'https://www.upsurfboard.com/wp-content/uploads/2019/05/Barceloneta-Playa-Surf-1.jpg', title: 'Sol, playa y footVoley', description: 'Sol, playa, footVoley y mucha diversión para empezar bien el día. Ven a disfrutar...', direction: 'https://goo.gl/maps/WqUnzYRVKLB2A4jE9', category: 'sport-activities' })
        .then((result) => {
          eventId = result.id

          return deleteEvent(wrongId, eventId)
        })
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`owner id ${wrongId} does not found`)
        })
    })

  })

  afterEach(() => User.deleteMany())
  after(() => disconnect())
})
