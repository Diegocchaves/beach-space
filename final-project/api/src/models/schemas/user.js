const { Schema, Types: { ObjectId } } = require('mongoose')

const user = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,

  },

  owner: [{
    type: ObjectId,
    ref: 'User'
  }],

  events: [{
    type: ObjectId,
    ref: 'Event'
  }]

})

module.exports = user