const User = require('../bot/models/user')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (err) {
        console.error(err);
    }
}


module.exports = { getUsers }