require('dotenv').config()
require('./db/db')()
require('./bot/bot')
const { json } = require('express')
const app = require('express')()
app.use(require('cors')())
app.use(json())


// Routers
const user = require('./routers/user')
const test = require('./routers/test')
const admin = require('./routers/admin')

// User router
app.use('/api', user)

// Test router
app.use('/api', test)

// Admin router
app.use('/api/admin', admin)














app.listen(3000, () => {
    console.log('connect 3000 - port');
})