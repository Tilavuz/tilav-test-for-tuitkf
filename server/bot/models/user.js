const { Schema, model } = require('mongoose')


const User = new Schema({
    name: String,
    chatId: Number,
    action: String,
    phone: String,
    loginCode: String,
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = model('User', User)