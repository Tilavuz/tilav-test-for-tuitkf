const mongoose = require('mongoose')
const MDCON = process.env.MDCON

function db() {
    mongoose.connect(MDCON)
        .then(() => {
            console.log('Connect db');
        })
        .catch(()=> {
            console.log('error db');
        })
}


module.exports = db