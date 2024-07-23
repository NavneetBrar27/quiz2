const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

console.log('MongoDB URI:', mongoURI);  // Check if URI is correctly loaded

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000  // Adjust the timeout value if needed
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

const studentSchema = new mongoose.Schema({
  myName: String,
  mySID: String
});

const Student = mongoose.model('Student', studentSchema, 's24students');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post('/', async (req, res) => {
  const { myuri } = req.body;

  const newData = {
    myName: "Navneet Kaur",
    mySID: "300377526"
  };

  try {
    const student = new Student(newData);
    await student.save();
    res.send(`<h1>Document Added</h1>`);
  } catch (error) {
    console.error('Error saving document:', error.message);
    res.status(500).send('Error saving document');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
