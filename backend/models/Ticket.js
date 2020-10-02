const mongoose = require('mongoose')
const moment = require('moment-timezone');
const timeZone = moment.tz(Date.now(),"Europe/Istanbul");
const Schema = mongoose.Schema

// Create Schema
const messages = new mongoose.Schema({
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: timeZone,

    },
    files: {
        type: Array
    }
})


const TicketSchema = new Schema({
    name: {
        type: String
    },
    date: {
        type: Date,
        default: timeZone,
    
    },
    content: {
        type: String
    },
    messages: {
        type: [messages]
    },
    status: {
        type: Number,
        default: 0
    },
    img: {
        type:String
    },
 

})

module.exports = User = mongoose.model('ticket', TicketSchema)