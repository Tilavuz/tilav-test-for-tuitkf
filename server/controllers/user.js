const User = require('../bot/models/user')
const jwt = require('jsonwebtoken')
const jwtDecoded = process.env.JWT_DECODED



const authUser = async (req, res) => {
    try {
        const user = await User.findOne({ loginCode: req.body.loginCode })

        if(user) {
            const token = jwt.sign({id: user._id, name: user.name, phone: user.phone}, jwtDecoded)
            return res.status(200).header('x-auth-token', token).send(token)
        }

        res.status(404).send("Foydalanuvchi topilmadi");

    }catch(err) {
        console.error("Foydalanuvchi izlashda xatolik:", error);
        res.status(500).send("Serverda xatolik yuzaga keldi");
    }
}


// Put user name
const putUserName = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, { name: req.body.name }, { new: true });
        const token = jwt.sign({id: user._id, name: user.name, phone: user.phone}, jwtDecoded)
        res.send(token)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}



// Get user by id
const getUserId = async (req, res) => {

}









module.exports = { getUserId, authUser, putUserName }