const { TestAuthor, Test } = require('../models/test')


// Avtorlar ro'yxatini olish
const getAuthor = async (req, res) => {
    try {
        const authors = await TestAuthor.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get Tests

const getTests = async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const tests = await Test.find({ author: authorId }); 
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Post author
const postAuthor = async (req, res) => {
    try {

        const { name, science } = req.body;

        const author = new TestAuthor({
            name,
            science,
            date: new Date()
        });

        const savedAuthor = await author.save();

        res.status(201).json(savedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Post tests
const postTests = async (req, res) => {
    try {
        const { test, author } = req.body;

        const newTest = new Test({
            test,
            author
        });
        const savedTest = await newTest.save();

        res.status(201).json(savedTest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getAuthor, getTests, postAuthor, postTests }