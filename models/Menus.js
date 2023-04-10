const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    item:{
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: {
            values: ['Appetizers', 'Drinks', 'Main Dishes'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    description:{
        type: String,
        required: false
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    date:{
        type: Date,
        default: () => { return new Date() }
    }
});

module.exports = mongoose.model('menu', menuSchema);
