const mongoose = require("mongoose");

exports.connectDB = async function () {
    const URI = process.env.URI;
    const connectionParams = {};

    mongoose.set("strictQuery", false);

    mongoose.connect(URI, connectionParams).then(() => console.info("Connected to mongodb")).catch((err) => console.error(err.message));
};
