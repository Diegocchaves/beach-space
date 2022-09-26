const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { ConflictError } = require('errors')
const registerUser = require('./registerUser')
const { expect } = require('chai')

describe('registerUser', () => {

  before(() => connect('mongodb://127.0.0.1:27017/users-db-test'))

  beforeEach(() => User.deleteMany())

  it('succeeds on correct credentials', () => {
    return registerUser('Peter Pan', 'peterpan@gmail.com', '1234')
      .then(result => {
        expect(result).to.be.undefined

        return User.findOne({ email: 'peterpan@gmail.com' })
      })
      .then(user => {
        expect(user.name).to.equal('Peter Pan')
        expect(user.email).to.equal('peterpan@gmail.com')
        expect(user.password).to.equal('1234')
      })
  })

  it('fails when user already exists', () => {
    return User.create({ name: 'Wendy Pan', email: 'wendypan1@gmail.com', password: '1234' })
      .then(() => registerUser('Wendy Pan', 'wendypan1@gmail.com', '1234'))
      .catch(error => {
        expect(error).to.be.instanceOf(ConflictError)
        expect(error.message).to.equal(`user with email wendypan1@gmail.com already exists`)
      })
  })

  afterEach(() => User.deleteMany())

  after(() => disconnect())
})