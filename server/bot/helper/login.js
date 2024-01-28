const User = require('../models/user')
const { loginCode } = require('./loginCode')
const { bot } = require('../bot')



const login = async (msg) => {

    const chatId = msg.from.id
    let user = await User.findOne({ chatId }).lean()

    let code = loginCode()
    let codeUser = await User.findOne({ loginCode: code })

    while(codeUser){
        code = loginCode()
        codeUser = await User.findOne({ loginCode: code })
        if(!codeUser) {
            user.loginCode = code
            await User.findByIdAndUpdate(user._id, user, { new: true })
        }
    }

    if(!codeUser) {
        user.loginCode = code
        await User.findByIdAndUpdate(user._id, user, { new: true })
    }
    bot.sendMessage(chatId, `Login code: <code>${code}</code>`, { parse_mode: 'HTML' })
}

module.exports = { login }