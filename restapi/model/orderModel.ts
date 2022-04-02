import { model, Schema} from 'mongoose'


const orderSchema = new Schema({
   _cliente_id: {
        type: String,
        required: true
    },
    _direccion: {
        type: String,
        required: true
    },
    _precio: {
        type: String,
        required: true
    },
    _productos: [{
        _id: String,
        _number: String
    }]
});

module.exports = model('pedidos', orderSchema);
