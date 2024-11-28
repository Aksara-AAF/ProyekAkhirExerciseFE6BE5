const express = require("express");
const app = express();
const user_router = require('./src/routes/user.routes');
const bcrypt = require("bcrypt");
const cors = require('cors');
const card_router = require('./src/routes/card.routes');
require("./src/configs/mongo.config").connectDB();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = 5001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get('/', async(req, res) => {
    res.send("hello");
})

app.use('/user', user_router);
app.use('/card', card_router);

app.listen(5001);