
var express = require("express");
var bodyParser = require('body-parser');
var db = require('./models/db')
var cors = require('cors')

// Initialize Express
var app = express();

// Parse request body as JSON

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/product.route.js')(app);
require('./routes/company.route.js')(app);
require('./routes/account.route.js')(app);


// Home route. Currently just to make sure app is running returns hello message.
app.get("/", function (req, res) {
    res.send("Hello from demo app!");
});

// Start the server
app.listen(3001, function () {
    console.log("Listening on port " + 3001 + ".");
});