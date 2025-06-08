const express = require('express');
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRouts");
const orderRoutes = require("./routes/orderroutes");


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (example)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/cart',cartRoutes)
app.use("/api/order",orderRoutes)
app.get('/check', (req, res) => {
  res.send('API is running...');
});


module.exports = app;
