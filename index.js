
const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const supplierRoutes = require('./routes/supplierRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

const PORT = 3999;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use('/supplier', supplierRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('images'));

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});

app.use('/Zomatoclone', (req, res) => {
    res.send("<h1>Welcome to Zomato-clone</h1>");
});