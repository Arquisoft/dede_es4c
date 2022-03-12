
const Schema = require('mongoose').Schema;
const model = require('mongoose').model;


const productSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
     _precio: {
        type: String,
        required: true
    }
});

module.exports = model('pinchos', productSchema);