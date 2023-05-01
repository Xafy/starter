const db = require('../models');

const Product = db.Product;

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({
            status : 'success',
            results: products.length,
            data: {products}
        });
    } catch (err) {
        res.status(404).json({"message" : `an error occured could not find any users... details: ${err}`});
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) throw new Error("could not find such product");
        res.status(200).json({
            status : 'success',
            data: {product}
        });
    } catch (err) {
        res.status(404).json({"message" : `an error occured could not find any products ... details: ${err}`});
    }
}

const addProduct = async (req, res, next) => {
    const {name, description, price} = req.body;

    try {
        const createdProduct = await Product.create({
            name,
            description,
            price
        });
        res.status(201).json({
            status : 'success',
            data: {createdProduct}
        });
    } catch (err){
        res.status(401).json({"message" : `an error occured could not create product ... details: ${err}`});
    }
}

const editProduct = (req, res, next) => {
    
}

const deleteProduct = (req, res, next) => {
    
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
}