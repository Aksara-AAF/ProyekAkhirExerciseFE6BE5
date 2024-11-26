const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    permintaan: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        required: true,
        default: "Available" 
    },

    expiresIn: {
        type: Number,
        required: true,
        default: 30000
    }
});

module.exports = mongoose.model("Card", CardSchema);