const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try{
        const {username, password, npm, contact, profilePicture} = req.body;
        if (npm.length == 10){
            const npmb = npm.trim();
            const duaDepan = npmb.substring(0, 2);
            const duaSetelah = npmb.substring(2, 4);
            if (Number(duaDepan) > 24 || duaSetelah !== "06"){
                res.status(201).json({success: false, message: "NPM tidak valid"});
                return {success: false, message: "NPM tidak valid"};
            }
        }else{
            res.status(201).json({success: false, message: "NPM tidak valid"});
            return {success: false, message: "NPM tidak valid"};
        }

        const user = await User.findOne({username: username});
        if (user != null){
            res.status(201).json({success: false, message: "Username is already used"});
            return {success: false, message: "Username is already used"};
        }else{
            const saltt = parseInt(process.env.salt);
            const hashed = await bcrypt.hash(password, saltt);
            const new_user = await new User({username: username, password: hashed, npm: npm, contact: contact, profilePicture: profilePicture});
            await new_user.save();
            const token = jwt.sign({id: new_user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, 
                sameSite: "none"
            });

            res.status(201).json({success: true, message: "Successfully created user", data: new_user, token: token});
            return {success: true,  message: "Successfully created user", data: new_user, token: token};
        }
    }catch (error){
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.login = async (req, res) => {
    try{
        const {username, password, npm} = req.body;
        const user = await User.findOne({username: username});

        if (user === null){
            res.status(201).json({success: false, message: "username tidak ada!"});
            return {success: false, message: "username tidak ada!"};
        }else{
            if (npm.trim() != user.npm){
                res.status(201).json({success: false, message: "npm-mu salah!"});
                return {success: false, message: "npm-mu salah!"};
            }

            const is_correct = await bcrypt.compare(password, user.password);
            if (is_correct){
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true, 
                    sameSite: "none"
                });

                res.status(201).json({success: true, message: "Successfully logged in", data: user, token: token});
                return {success: true, message: "Successfully logged in", data: user, token: token};
            }else{
                res.status(201).json({success: false, message: "passwordmu salah!"});
                return {success: false, message: "passwordmu salah!"};
            }
        }
    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message: err.message});
        return {success: false, message: err.message};
    }
}

exports.get_my_info = async (req, res) => {
    try{
        const u_id = req.user;
        const user = await User.findById(u_id.id);
        
        res.status(201).json({success: true, message: "Successfully retrieved user info", data: user});
        return {success: true, message: "Successfully retrieved user info", data: user};
    }catch(err){
        return {success: false, message: err.message};
    }
}

exports.get_user_info_from_their_card = async (req, res) => {
    try{
        const u_id = req.user;
        const username = req.body;
        const user = await User.findOne({username: username});

        res.status(201).json({success: true, message: "Successfully retrieved user info", data: user});
        return {success: true, message: "Successfully retrieved user info", data: user};
    }catch (err){
        console.log(err.message);
        res.status(500).json({success: false, message: err.message});
    }
}