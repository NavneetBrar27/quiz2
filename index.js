const mongoose = require('mongoose');

const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});


// Create a Schema object
const studentSchema = new mongoose.Schema({
  myName: String,
  mySID: String
});

// Create a Model object
const Student = mongoose.model('Student', studentSchema, 's24students');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  const { myuri } = req.body;

  // Example data (replace with your actual name and student ID)
  const newData = {
    myName: "Navneet Kaur",
    mySID: "300377526"
  };

  try {
    // Create a new document based on the Student model
    const student = new Student(newData);

    // Save the document to MongoDB
    await student.save();


  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
}catch(error){console.error('Error saving document:', error.message);
res.status(500).send('Error saving document');
}});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
