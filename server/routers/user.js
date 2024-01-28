const router = require('express').Router()
const { getUserId, authUser } = require('../controllers/user')
const { auth } = require('../middlewares/auth')





// Auth User
router.post('/login', authUser)




// Get user by id
router.get('/user', auth, getUserId)



module.exports = router