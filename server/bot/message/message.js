const { bot } = require('../bot')
const { start, requestContact } = require('../helper/start')
const { login } = require('../helper/login')
const User = require('../models/user')


bot.on('message', async msg => {

    const chatId = msg.from.id
    const text = msg.text
    const user = await User.findOne({ chatId })

    if(text === '/start') {
        start(msg)
    }

    if(user) {
        if(user.action === 'request_contact' && !user.phone) {
            requestContact(msg)
        }
    }

    if(text === '/login' && user.action === '/login' && user.phone) {
        login(msg)
    }

})



