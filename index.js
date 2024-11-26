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
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));

app.use('/user', user_router);
app.use('/card', card_router);

app.post('/card/post', async (req, res) => {
    res.send("hello");
})

// app.post('/user/register', async (req, res) => {
//     try{
//         const {username, password, npm, contact} = req.body;
//         const hashed = await bcrypt.hash(valPass, 10);
//         const user = await User.findOne({username: valUser});
//         if (user != null){
//             res.status(201).json({success: false, message: "Username is already used"});
//         }else{
//             const new_user = await new User({username: username, password: password, npm: npm, contact: contact});
//             await new_user.save();

//             res.status(201).json({success: true, message: "Successfully created user", data: new_user});
//         }
//     }catch (error){
//         res.status(500).json({success: false, message: error.message});
//     }
// })

app.listen(5001);