const express = require('express');
const { addProduct, showProducts } = require('../controllers/productController.js');

const productRouter = express.Router();

productRouter.get('/all', showProducts);
productRouter.post('/add', addProduct);

module.exports = productRouter;