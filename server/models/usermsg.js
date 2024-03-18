const { Schema, model } = require('mongoose')


const UserMsg = new Schema({
    id: String,
    name: String,
    phone: String,
    message: String,
    ip: String
})



const Message = model('Message', UserMsg)


module.exports = { Message }