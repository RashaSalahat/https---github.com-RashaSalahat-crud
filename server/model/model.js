const mongoose = require('mongoose');

var schema = new mongoose.Schema({  //to define a shape and content of the doc
    name : {
        type : String,
        required: true
    },
    address: {
        type : String,
        required: true
    },
    open : String,
    close : String,
    status: String
})

const Storedb = mongoose.model('storedb', schema);

module.exports = Storedb;