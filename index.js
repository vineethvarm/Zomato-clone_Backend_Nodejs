
const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const supplierRoutes = require('./routes/supplierRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3999;

dotEnv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/supplier', supplierRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('images'));

// Default Route
app.use('/', (req, res) => {
    res.send("<h1> Welcome to Zomato-clone </h1>");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});