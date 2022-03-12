const mongoose = require('mongoose')

const connectBD = async () => {
    mongoose.connect('mongodb+srv://es4c:es4c@cluster0.hcz1f.mongodb.net/bar_pinchos?retryWrites=true&w=majority')
    .then(() => {
        console.log("Database connected")
    }).catch(()=>{
        console.error("error")
    })
}

module.exports = connectBD;
