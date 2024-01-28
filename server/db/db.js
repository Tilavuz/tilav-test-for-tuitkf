const mongoose = require('mongoose')

function db() {
    mongoose.connect('mongodb://127.0.0.1:27017/tilavtest')
        .then(() => {
            console.log('Connect db');
        })
        .catch(()=> {
            console.log('error db');
        })
}


module.exports = db