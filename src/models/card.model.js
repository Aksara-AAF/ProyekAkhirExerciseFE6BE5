const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        default: "Card title"
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
        type: String,
        required: true,
        default: "1d"
    }
});

module.exports = mongoose.model("Card", CardSchema);