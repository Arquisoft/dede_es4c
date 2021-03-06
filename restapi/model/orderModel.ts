import { model, Schema } from 'mongoose'

const orderSchema = new Schema({
    _cliente_id: {
        type: String,
        required: true
    },
    _direccion: {
        type: Map,
        of: String,
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
    },
    _costeEnvio: {
        type: String,
        required: true
    },
    _fecha: {
        type: Date,
        required: true
    }
});

module.exports = model('pedidos', orderSchema);
