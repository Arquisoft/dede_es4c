import { model, Schema} from 'mongoose'

const productSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
     _precio: {
        type: String,
        required: true
    },
    _tipo: {
        type: String,
        required: true
    },
    _vegetariano: {
        type: Boolean,
        required: true
    },
    _descripcion: {
        type: String,
        required: true
    },
    _ingredientes:{
        type: Array,
        required: false
    }
});

module.exports = model('pinchos', productSchema);
