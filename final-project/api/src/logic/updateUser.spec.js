const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const updateUser = require('./updateUser')
const { expect } = require('chai')
const { NotFoundError } = require('errors')
const { ObjectId } = require('bson')

describe('updateUser', () => {
  before(() => connect('mongodb://127.0.0.1:27017/users-db-test'))

  beforeEach(() => User.deleteMany())

  describe('when user already exists', () => {
    let user

    beforeEach(() => {
      user = new User({ name: 'Diego', lastName: 'Carvalho', email: 'diegocarve@gmail.com', password: '1234' })

      return user.save()
    })

    it('succeeds on correct user data', () =>
      updateUser(user.id, 'Diego', 'Carvalho', 'diegocarve@gmail.com', '1234')
        .then(result => {
          expect(result).to.be.undefined

          return User.findById(user.id)
        })
        .then(user => {
          expect(user.name).to.equal('Diego')
          expect(user.lastName).to.equal('Carvalho')
          expect(user.email).to.equal('diegocarve@gmail.com')
          expect(user.password).to.equal('1234')

        })
    )

    it('fails on incorrect user id', () => {
      const wrongId = new ObjectId().toString()

      return updateUser(wrongId, 'Diego', 'Carvalho', 'diegocarve@gmail.com', '1234')
        .then(result => {

          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
        })
    })
  })

  describe('when user does not exist', () => {
    it('fails on unexisting user id', () => {
      const unexistingUserId = new ObjectId().toString()

      return updateUser(unexistingUserId, 'Diego', 'Carvalho', 'diego@gmail.com', '1234')
        .then(result => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(NotFoundError)
          expect(error.message).to.be.equal(`user with id ${unexistingUserId} does not exist`)
        })
    })
  })

  afterEach(() => User.deleteMany())
  after(() => disconnect())
})


