const User = require('../bot/models/user')
const { Message } = require('../models/usermsg')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (err) {
        console.error(err);
    }
}

const getMessages = async (req, res) => {
    try {
        const msg = await Message.find()
        const data = msg.reverse()
        res.json(data)
    }catch (err) {
        console.log(err);
    }
}


module.exports = { getUsers, getMessages }