const { model } = require('mongoose')
const { user, event } = require('./schemas')

const User = model('User', user)
const Event = model('Event', event)

module.exports = {
	User,
	Event,

}