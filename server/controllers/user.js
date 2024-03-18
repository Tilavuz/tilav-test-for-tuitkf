const User = require('../bot/models/user')
const jwt = require('jsonwebtoken')
const jwtDecoded = process.env.JWT_DECODED
const { Message } = require('../models/usermsg')


// Auth user
const authUser = async (req, res) => {
    try {
        const user = await User.findOne({ loginCode: req.body.loginCode })

        if(user) {
            const token = jwt.sign({id: user._id, name: user.name, phone: user.phone, admin: user.admin}, jwtDecoded)
            return res.status(200).header('x-auth-token', token).send(token)
        }

        res.status(404).send("Foydalanuvchi topilmadi");

    }catch(err) {
        console.error("Foydalanuvchi izlashda xatolik:", error);
        res.status(500).send("Serverda xatolik yuzaga keldi");
    }
}

// user message
const postMessage = async (req, res) => {
    try {
        const msg = {
            id: req.body.id,
            name: req.body.name,
            message: req.body.message,
            phone: req.body.phone,
            ip: req.ip
        }
        
        const newMsg = new Message(msg)

        await newMsg.save()
        
        return res.json({msg: 'Habaringiz yuborildi !'})

    }catch {

    }
}

// Put user name
const putUserName = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, { name: req.body.name }, { new: true });
        const token = jwt.sign({id: user._id, name: user.name, phone: user.phone, admin: user.admin}, jwtDecoded)
        res.send(token)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = { authUser, putUserName, postMessage }