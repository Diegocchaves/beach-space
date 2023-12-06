const { connect, disconnect } = require('mongoose')

const { User } = require('../models')
const { AuthError } = require('errors')
const authenticateUser = require('./authenticateUser')
const { expect } = require('chai')

describe('authenticateUser', () => {
  before(() => connect('mongodb://127.0.0.1:27017/users-db-test'))

  beforeEach(() => User.deleteMany())

  describe('when user already exist', () => {
    let user

    beforeEach(() => {
      user = new User({ name: "Diego", lastName: 'Carvalho', email: "diegocarve@gmail.com", password: '1234' })

      return user.save()
    })

    it('succeeds on correct credentials', () =>
      authenticateUser('diegocarve@gmail.com', '1234')
        .then(userId => {

          expect(userId).to.be.a('string')
          expect(userId).to.be.equal(user.id)
        })

    )
    it('fails on incorrect password', () => {
      authenticateUser('diegocarve@gmail.com', '1234-wrong')
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(AuthError)
          expect(error.message).to.equal('wrong credentials')
        })
    })

    it('fails on incorrect email', () => {
      authenticateUser('diegocarve@gmail.com', '1234')
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(AuthError)
          expect(error.message).to.be.equal('wrong credentials')
        })
    })
  })
  describe('when user not does not exist', () => {
    it('fails on credentials from non-existing user', () =>
      authenticateUser('diegocarve@gmail.com', '1234')
        .then(() => {
          throw new Error('should not reach this point')
        })
        .catch(error => {
          expect(error).to.be.instanceOf(AuthError)
          expect(error.message).to.equal('wrong credentials')
        })
    )
  })

  afterEach(() => User.deleteMany())

  after(() => disconnect())

})
