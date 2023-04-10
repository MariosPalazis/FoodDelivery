const mongoose = require('mongoose');



const itemSchema =  new mongoose.Schema({
    itemCode:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"menus",
        required: true
    },
    quantity:{
        type: Number,
        min: 0,
        required: true
    },
});

const ordersSchema = new mongoose.Schema({
    itemlist:[ itemSchema ],
    address:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: () => { return new Date() }
    }
});

module.exports = mongoose.model('orders', ordersSchema);
