const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

const route = require("./route/routes");





const port = 3000;

// app.use(bodyParser.urlencoded({
//     extended: true
//   }))



app.use("/api", route);

app.listen(port, () => {
    console.log(`server started at ${port}`);
})
