const express = require('express');
const authRoute = require("./routes/authRoute")


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (example)
app.use('/api/auth', authRoute)
app.get('/check', (req, res) => {
  res.send('API is running...');
});


module.exports = app;
