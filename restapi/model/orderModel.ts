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
    _productos: {
        type: Map,
        of: String,
        default: {}
    }
});

module.exports = model('pedidos', orderSchema);
