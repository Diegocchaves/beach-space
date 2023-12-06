const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Event } = require('../models')
const { NotFoundError } = require('errors')
const createEvent = require('./createEvent')
const { expect } = require('chai')

describe('createEvent', () => {
  before(() => connect('mongodb://127.0.0.1:27017/events-db-test'))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  describe('when owner already exists', () => {
    let ownerEvent

    beforeEach(() => {
      ownerEvent = new User({ name: 'Mar', lastName: 'Lucia', email: 'marlucia@gmail.com', password: '1234' })

      return ownerEvent.save()
    })

    it('succeeds on correct ownerEvent data', () =>
      createEvent(ownerEvent.id, 'Surf Session Barceloneta', 'Una exelente oportunidad para disfrutar de las olas de Barceloneta.', 'Playa de Barceloneta', '30/07/2022')
        .then(eventId => {
          expect(eventId).to.be.a('string')

          return Event.findById(eventId)
        })
        .then(event => {
          expect(event.ownerEvent.toString()).to.equal(ownerEvent.id)
          // expect(event.photo).to.equal('https://www.upsurfboard.com/wp-content/uploads/2019/05/Barceloneta-Playa-Surf-1.jpg')
          expect(event.title).to.equal('Surf Session Barceloneta')
          expect(event.description).to.equal('Una exelente oportunidad para disfrutar de las olas de Barceloneta.')
          expect(event.location).to.equal('Playa de Barceloneta')
          expect(event.eventDate).to.equal('30/07/2022')
          // expect(event.direction).to.equal('https://goo.gl/maps/WqUnzYRVKLB2A4jE9')
          // expect(event.category).to.equal('sport-activities')
          // expect(event.date).to.be.instanceOf(Date)
        })
    )

    it('fails on incorrect ownerEvent id', () => {
      const wrongId = new ObjectId().toString()

      return createEvent(wrongId, 'Surf Session Barceloneta', 'Una exelente oportunidad para disfrutar de las olas de Barceloneta.', 'Playa de Barceloneta', '30/07/2022')
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`ownerEvent with id ${wrongId} does not exist`)
        })
    })
  })

  describe('when ownerEvent does not exist', () => {
    it('fails on unexisting ownerEvent id', () => {
      const unexistingOwnerId = new ObjectId().toString()

      return createEvent(unexistingOwnerId, 'Surf Session Barceloneta', 'Una exelente oportunidad para disfrutar de las olas de Barceloneta.', 'Playa de Barceloneta', '30/07/2022')
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.equal(`ownerEvent with id ${unexistingOwnerId} does not exist`)
        })
    })
  })

  afterEach(() => User.deleteMany())

  after(() => disconnect())
})