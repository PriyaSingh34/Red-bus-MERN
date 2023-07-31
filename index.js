const express = require('express')
const app = require('./app.js')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const port = 4003;

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
const url = "mongodb+srv://priyasingh:Priya@cluster0.kepu1bm.mongodb.net/reserve?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to the database'))

// Start Server
app.listen(port, () => console.log(`Server is working, App listening on port ${port}!`))
