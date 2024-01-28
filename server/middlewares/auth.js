const jwt = require('jsonwebtoken')
const jwtDecoded = process.env.JWT_DECODED

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token) 
        return res.status(401).json({message: 'Syatdan to\'liq foydalanish uchun ro\'yhatdan o\'ting'})

    try {
        const decoded = jwt.verify(token, jwtDecoded)
        req.user = decoded
        next()

    }catch (err) {
        return res.status(400).json({message: 'Yaroqsiz foydalanuvchi', error: err})
    }
}


module.exports = { auth }