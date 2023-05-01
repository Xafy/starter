const express = require('express');
const router = express.Router();

const verifyAuth = require('../middlewares/verifyAuth');
const productsController = require('../controller/products.controllers')


router.route('/')
        .get(verifyAuth.verifyToken, productsController.getProducts)
        .post(productsController.addProduct)

router.route('/:id')
        .get(productsController.getProductById)
        .patch(productsController.editProduct)
        .delete(productsController.deleteProduct)

module.exports = router ;