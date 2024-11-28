const mongoose = require("mongoose");

exports.connectDB = async function () {
    const URI = "mongodb://jaxpentalol:zOOpcMTPoIuiWFSn@cluster0-shard-00-00.uzrum.mongodb.net:27017,cluster0-shard-00-01.uzrum.mongodb.net:27017,cluster0-shard-00-02.uzrum.mongodb.net:27017/?replicaSet=atlas-w5iwml-shard-0&ssl=true&authSource=admin";
    const connectionParams = {};

    mongoose.set("strictQuery", false);

    mongoose.connect(URI, connectionParams).then(() => console.info("Connected to mongodb")).catch((err) => console.error(err.message));
};
