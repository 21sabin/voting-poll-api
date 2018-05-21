const express = require("express");
const bodyParser = require("body-parser");
const morgan=require('morgan');
const cors=require('cors')

const mongoose=require('./connection/mongoose.con');

var app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//use morgan to log request to the console
app.use(morgan('dev'))

const route = require("./route/routes");





const port = 3000;

// app.use(bodyParser.urlencoded({
//     extended: true
//   }))

//cors middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


app.use("/api", route);

app.listen(port, () => {
    console.log(`server started at ${port}`);
})
