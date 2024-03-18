const router = require('express').Router()
const { authUser, putUserName, postMessage } = require('../controllers/user')
const { auth } = require('../middlewares/auth')





// Auth User
router.post('/login', authUser)


// Send user message
router.post('/user/faq', postMessage)


// Put user name
router.put('/user', auth, putUserName)



module.exports = router