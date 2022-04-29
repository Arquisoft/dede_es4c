import { model, Schema} from 'mongoose'

const memberSchema = new Schema({
    _uo: {
        type: String,
        required: true
    },
     _name: {
        type: String,
        required: true
    }
});

module.exports = model('miembros', memberSchema);