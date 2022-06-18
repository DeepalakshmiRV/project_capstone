

module.exports = function (app) {

    var products = require('../controllers/product.controller.js');

    // Find all products
    app.get('/api/products', products.findAll);

    // Find a single Product by Id
    app.get('/api/productbyid/:id', products.findProductById);

    app.get('/api/productbyidCode/:id', products.findProductByIdCode);

    // Find a single Product by Name
    app.get('/api/products/:productName', products.findByName);

    // Find all Products of a Company
    app.get('/api/products/company/:companyId', products.findByCompanyId);

    // Add New Product
    app.post('/api/products', products.addProduct);

    // Delete a single Product By Id
    app.delete('/api/products/:id', products.removeById);

    // Update a single Product By Id
    app.put('/api/products/:id', products.updateById);
}