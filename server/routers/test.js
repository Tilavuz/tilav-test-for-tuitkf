const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { adminMiddleware } = require('../middlewares/admin')
const { upload } = require('../middlewares/testFile')
const { getAuthor, getTests, postAuthor, postTests, deleteAuthor } = require('../controllers/test')


// Get author
router.get('/authors', getAuthor)

// Get tests
router.get('/authors/:authorId/tests', auth, getTests)

// post author
router.post('/author', adminMiddleware, postAuthor)

// Delete author with test
router.delete('/author/:id', adminMiddleware, deleteAuthor)

// Post tests
router.post('/test', adminMiddleware, upload.single('test'), postTests)

module.exports = router