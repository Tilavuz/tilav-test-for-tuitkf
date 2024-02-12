const { adminMiddleware } = require('../middlewares/admin')
const router = require('express').Router()
const { getUsers } = require('../controllers/admin')


router.get('/users', adminMiddleware, getUsers)




module.exports = router