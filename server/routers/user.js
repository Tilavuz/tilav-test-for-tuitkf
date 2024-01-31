const router = require('express').Router()
const { getUserId, authUser, putUserName } = require('../controllers/user')
const { auth } = require('../middlewares/auth')





// Auth User
router.post('/login', authUser)




// Get user by id
router.get('/user', auth, getUserId)


// Put user name
router.put('/user', auth, putUserName)



module.exports = router