import { model, Schema} from 'mongoose'

const userSchema = new Schema({
    _username: {
        type: String,
        required: true
    },
     _email: {
        type: String,
        required: true
    },
    _password: {
        type: String,
        required: true
    }
});

module.exports = model('usuarios', userSchema);