// require needed modules
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

// schema
var productSchema = new Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  productAmount: { type: Number, required: true },
  productImage: { type: String}
  
})

// create model from schema
var Products = mongoose.model('Products', productSchema)

// export module to make it available in other scripts
module.exports = Products

