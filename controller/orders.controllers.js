const { Op, where } = require('sequelize');
const db = require('../models');

const Order = db.Order;
const Product = db.Product;
const User = db.User;

const getOrders = async (req, res, next) => {
    try {
        const orders = Order.findAll();
        res.status(200).json({
            status: "success",
            results: orders.length,
            data: {orders}
        })
    } catch (err) {
        res.status(404).json({"message" : `an error occured could not find any orders ... details: ${err}`})
    }
}

const getOrderById = async (req, res, next) => {
    try {
        const order = Order.findByPk(req.params.id);
        if (!order) throw new Error("could not find such order");
        res.status(200).json({
            status : 'success',
            data: {order}
        });
    } catch (err) {
        res.status(404).json({"message" : `an error occured could not find any orders ... details: ${err}`})
    }
}

const createOrder = async (req, res, next) => {
    try {
        const total = await Product.sum('price', {where: {
            id: {[Op.in] : [2, 3]}
        }})

        const order = await Order.create({
            userId: 2,
            total
        });

        await order.setProducts([3,4,5,6,7]);

        res.status(300).json({
            status : "success",
            data : {order}
        })
    } catch (err){
        res.status(404).json({"message" : `an error occured could not create order ... details: ${err}`})
    }
}

const updateOrder = (req, res, next) => {
    const total = Product.sum('price',{where:{
        id: {[Op.in]: [2,3]}
    }});

    const order = Order.findByPk(req.params.id,{
        include: 'Product'
    });

    order.update({
        total,
    });

    order.setProducts([2, 3])
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder
}