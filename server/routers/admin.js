const { adminMiddleware } = require('../middlewares/admin')
const router = require('express').Router()
const { getUsers, getMessages } = require('../controllers/admin')


router.get('/users', adminMiddleware, getUsers)

router.get('/msg', adminMiddleware, getMessages)


module.exports = router