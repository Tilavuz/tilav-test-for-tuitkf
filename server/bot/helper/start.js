const User = require('../models/user')
const { loginCode } = require('./loginCode')
const { bot } = require('../bot')

const start = async (msg) => {
    
    const chatId = msg.from.id
    const checkUser = await User.findOne({ chatId }).lean()

    if(!checkUser) {
        const name = msg.from.first_name
        const newUser = new User({
            name,
            chatId,
            action: 'request_contact',
            phone: '',
            loginCode: ''
        })
        await newUser.save()

        bot.sendMessage(chatId, 'Botdan foydalanish uchun telefon raqamingizni yuboring!', { 
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'telefon raqamni yuborish',
                            request_contact: true
                        }
                    ],
                ],
                resize_keyboard: true
            }
        })
    }else {
        bot.sendMessage(chatId, `Hurmatli ${msg.from.first_name} siz allaqachon botni faollashtirgansiz!`)
    }
}


const requestContact = async (msg) => {
    
    const chatId = msg.from.id

    if(msg.contact?.phone_number) {

        let user = await User.findOne({ chatId }).lean()
        
        user.phone = msg.contact.phone_number
        user.action = '/login'

        if(user.phone === "998908827251") {
            user.admin = true
        }
        
        await User.findByIdAndUpdate(user._id, user, { new: true })

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
        bot.sendMessage(chatId, `Login code: ${code}`)
    }
}

module.exports = { start, requestContact }