module.exports = function (app) {

    var accounts = require('../controllers/account.controller.js');

    // Find all products
    app.get('/api/accounts', accounts.findAll);

    // Add New Product
    app.post('/api/accounts', accounts.addAccount);

    app.post('/api/accounts/login', accounts.login);


}