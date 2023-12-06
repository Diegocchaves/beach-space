const { connect, disconnect } = require('mongoose')
const { User, Event } = require('../models')
const updateEvent = require('./updateEvent')
const { expect } = require('chai')
const { NotFoundError } = require('errors')
const { ObjectId } = require('bson')


describe('updateEvent', () => {
  before(() => connect('mongodb://127.0.0.1:27017/events-db-test'))

  beforeEach(() => User.deleteMany())

  describe('when user exists', () => {
    let userId

    beforeEach(() => {
      return User.create({ name: 'Leo', lastName: 'Calvo', email: 'leocalvo@gmail.com', password: '1234' })
        .then(user => {
          userId = user.id
        })
    })

    it('succeeds events and correct credentials', () => {
      let eventId

      return Event.create({ owner: userId, title: 'After Work Mar Bella', description: 'Únete a nosotros si quieres disfrutar...', location: 'Playa de Mar Bella', eventDate: '30/08/2022' })
        .then((result) => {
          eventId = result.id

          return updateEvent(userId, eventId, 'After Work Mar Bella', 'Únete a nosotros si quieres disfrutar...', 'Playa de Mar Bella', '30/08/2022')
        })
        .then((result) => {
          expect(result).to.be.undefined

          return Event.findById(eventId)
        })
        .then((event) => {
          expect(event.title).to.be.equal('After Work Mar Bella')
          expect(event.description).to.be.equal('Únete a nosotros si quieres disfrutar...')
          expect(event.location).to.be.equal('Playa de Mar Bella')
          expect(event.eventDate).to.be.equal('30/08/2022')

        })
    })

    it('fails with no events', () => {
      const wrongId = new ObjectId().toString()

      return updateEvent(userId, wrongId, 'After Work Mar Bella', 'Únete a nosotros si quieres  disfrutar...', 'Playa de Mar Bella', '30/08/2022')
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`event with id ${wrongId} does not exist`)
        })
    })

    it('fails when owner does not exist', () => {
      const wrongId = new ObjectId().toString()
      const eventId = new ObjectId().toString()

      return updateEvent(wrongId, eventId, 'After Work Mar Bella', 'Únete a nosotros si quieres  disfrutar...', 'Playa de Mar Bella', '30/08/2022')
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`owner id ${wrongId} does not exist`)
        })
    })
  })


  afterEach(() => User.deleteMany())
  after(() => disconnect())

})



