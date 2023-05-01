const express = require('express');
const router = express.Router();

const ordersController = require('../controller/orders.controllers')


router.route('/')
        .get(ordersController.getOrders)
        .post(ordersController.createOrder)

router.route('/:id')
        .get(ordersController.getOrderById)
        .patch()
        .delete()

module.exports = router ;