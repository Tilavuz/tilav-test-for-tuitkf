const { Schema, model } = require('mongoose')

const TestAuthorSchema = new Schema({
    name: String,
    science: String,
    date: Date
})

const TestSchema = new Schema({
    test: Array,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'TestAuthor'
    }
})


const TestAuthor = model('TestAuthor', TestAuthorSchema);
const Test = model('Test', TestSchema);

module.exports = { TestAuthor, Test };