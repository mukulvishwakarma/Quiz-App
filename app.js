const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { Router } = require('./api/routes')

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Router
app.use('/api', Router)


// Handle 404 error
app.use(function (req, res, next) {
  throw new Error(`Resource not found : ${req.originalUrl}`)
})

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: false })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
