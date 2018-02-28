const express = require("express");
const bodyParser = require("body-parser");

const mongoose=require('./connection/mongoose.con');

var app = express();

app.use(bodyParser.json());

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
