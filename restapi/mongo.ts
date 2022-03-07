const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://es4c:es4c@cluster0.hcz1f.mongodb.net/bar_pinchos?retryWrites=true&w=majority')
    .then(() => {
        console.log("Database connected")
    }).catch(()=>{
        console.error("error")
    })
    const { Schema } = mongoose;
const pinchoSchema  = new Schema({
    _id: {
        type: String,
        required: true
    },
     _precio: {
        type: String,
        required: true
    }
});
const pinchos = mongoose.model('pinchos',pinchoSchema)
//const users = mongoose.model('users',pincho)
//const pedidos = mongoose.model('pedidos',pincho)


function addPincho(name, precio){
    const pinchoNuevo = new pinchos({
        _id:name,
        _precio:precio
    });
    pinchoNuevo.save()
        .then(result=>{
            console.log(result)
            mongoose.connection.close();
        }).catch((error)=>{
            console.error(error)
    })
}
function findAllPinchos(){
    pinchos.find({}).then(result=>{
        console.log(result)
        mongoose.connection.close();
    }).catch(()=>{
           console.error("error")
    })
}
function findPinchoByName(name){
    pinchos.findById(name).then((result)=> {
        console.log(result)
        mongoose.connection.close();
    }).catch((error)=>{
        console.error(error)
    })
}
function findAllUsers(){
    pinchos.find({}).then((result)=>{
        console.log(result)
        mongoose.connection.close();
    }).catch(()=>{
           console.error("error")
    })
}
function findUserByName(name){
    pinchos.findById(name).then((result)=>{
        console.log(result)
        mongoose.connection.close();
    }).catch((error)=>{
        console.error(error)
    })
}
function findAllPedidos(){
    pinchos.find({}).then((result)=>{
        console.log(result)
        mongoose.connection.close();
    }).catch(()=>{
           console.error("error")
    })
}
function findPedidoByName(name){
    pinchos.findById(name).then((result)=>{
        console.log(result)
        mongoose.connection.close();
    }).catch((error)=>{
        console.error(error)
    })
}
//findPinchoByName("tortilla");
addPincho("jhg",18.0)