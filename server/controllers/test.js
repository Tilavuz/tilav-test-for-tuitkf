const { TestAuthor, Test } = require("../models/test");
const mammoth = require("mammoth");

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
      date: new Date(),
    });

    const savedAuthor = await author.save();

    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete test with author
const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    await TestAuthor.findByIdAndDelete(id);
    await Test.findOneAndDelete({ author: id });
    res.status(200).json({ message: "Author va test o'chirildi" });
  } catch (err) {
    console.error(err);
  }
};

// Post tests
const postTests = async (req, res) => {
    try {
      const file = req.file;
  
      const { value } = await mammoth.extractRawText({ path: file.path });
  
      // Faylni qaytarilgan matndan testlarni ajratib olamiz
      const lines = value.split("\n");
      const tests = [];
      let currentTest = {};
      lines.forEach((line) => {
        if (line.endsWith("?")) {
          // Yangi test boshlanganini aniqlash
          if (Object.keys(currentTest).length !== 0) {
            tests.push(currentTest);
          }
          currentTest = {
            question: line.trim(),
            options: [],
            correct_answer: null,
          };
        } else if (line.startsWith("+")) {
          // To'g'ri javob qismi
          currentTest.correct_answer = line.slice(1).trim();
          currentTest.options.push(line.slice(1).trim());
        } else if (line.trim() !== "") {
          // Qoldiq variantlar
          currentTest.options.push(line.trim());
        }
      });
      // Oxirgi testni ham qo'shamiz
      if (Object.keys(currentTest).length !== 0) {
        tests.push(currentTest);
      }
  
      const testData = {
        test: tests,
        author: req.body.author,
      };
      const newTest = new Test(testData);
      await newTest.save();
  
      // Faylni o'chirish
      const fs = require("fs");
      fs.unlinkSync(file.path);
  
      // Muvaffaqiyatli javobni mijozga jo'natish
      res.status(201).json({ message: "Test muvaffaqiyatli yaratildi", test: newTest });
    } catch (err) {
      // Xato holatida xabar chiqarish
      console.error(err);
      res.status(500).json({ error: "Ichki server xatosi" });
    }
  };
  

module.exports = { getAuthor, getTests, postAuthor, postTests, deleteAuthor };
