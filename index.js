require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./src/route/user.route');
const morgan = require('morgan');


const app = express();

const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;


// Middleware to parse JSON
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRouter); 


// Connect to MongoDB
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ DB connection error:', err.message);
  process.exit(1); // Exit if unable to connect
});

// Set up a basic route
app.get('/', (req, res) => {
    console.log('Home page');
  res.send('Hello World from Express!');
});



// 5. Start the server
app.listen(port, () => {

  console.log(`Server is running at http://localhost:${port}`);
});