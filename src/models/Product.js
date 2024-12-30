const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum:['electronic','digital','fashion','sports']
    }
})

const Products = mongoose.model('Products',productSchema);
module.exports = Products;