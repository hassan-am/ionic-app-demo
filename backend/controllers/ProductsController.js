const mongoose = require("mongoose")
const Products = require("../models/Products")

const productsController = {};

productsController.listProducts = async function (req, res) {
    try {
        const products = await Products.find()
        return res.json(products)
    }
    catch (err) {
        console.log(`listProducts err: ${err}`)
        return res.json({ "error": "Oops... Something went wrong, please try again later." })
    }

}

module.exports = productsController