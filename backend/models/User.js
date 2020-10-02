const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment-timezone');
const dateTr = moment.tz(Date.now(), "Europe/Istanbul");



// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default:0
  },
  date: {
    type: Date,
    default: dateTr
  }
})

module.exports = User = mongoose.model('users', UserSchema)