const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    npm: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: "https://www.worldometers.info/img/flags/id-flag.gif"
    }
});

module.exports = mongoose.model("User", UserSchema);