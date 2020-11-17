var mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/ecommercedb", { useNewUrlParser: true })
    .then(() => { console.log('Successfully connected with database.') })
    .catch((err) => { console.log('Error Caught : ' + err) });