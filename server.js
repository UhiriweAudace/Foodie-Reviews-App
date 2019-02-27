const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();



//DB configuration
const db = require('./config/keys').MongoURI;


//Connect to MongoDb database
mongoose.connect(db)
    .then(() => console.log("MongoDB connection successful.."))
    .catch(() => console.log("failed to connect.."))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accepted,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH ,OPTIONS');
    next();
});
//Load Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + './frontend/dist/the-hottest-reviews/'));

// Load the routes
const userRoutes = require('./routes/usersRoutes');
app.use('/api/auth', userRoutes);
const saucesRoutes = require('./routes/saucesRoutes');
app.use('/api/sauces', saucesRoutes)

app.use('/images', express.static(path.join(__dirname, 'images')))



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Hot Cakes App is running on port ${port}`)
});