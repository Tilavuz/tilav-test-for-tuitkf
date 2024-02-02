const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { getAuthor, getTests, postAuthor, postTests } = require('../controllers/test')


// Get author
router.get('/authors', getAuthor)

// Get tests
router.get('/authors/:authorId/tests', auth, getTests)

// post author
router.post('/author', postAuthor)

// Post tests
router.post('/test', postTests)

module.exports = router