const Card = require("../models/card.model");
const User = require("../models/user.model");
exports.postCard = async (req, res) => {
    try{
        const user_id = req.user;
        const userr = await User.findById(user_id.id);
        const {title, message, time_limit} = req.body;
        const new_card = await new Card({username: userr.username, permintaan: message, title: title});
        await new_card.save();
        let time = new_card.expiresIn;
        if (new_card.expiresIn){
            if (new_card.expiresIn[new_card.expiresIn.length - 1] == 'm'){
                time = 1000*60*Number(new_card.expiresIn.substring(0, new_card.expiresIn.length - 1));
            }else if (new_card.expiresIn[new_card.expiresIn.length - 1] == 'h'){
                time = 1000*60*60*Number(new_card.expiresIn.substring(0, new_card.expiresIn.length - 1));
            }else if (new_card.expiresIn[new_card.expiresIn.length - 1] == 'd'){
                time = 1000*60*60*24*Number(new_card.expiresIn.substring(0, new_card.expiresIn.length - 1));
            }
        }
        
        setTimeout(async () => {
            await Card.findByIdAndDelete(new_card.id);
        }, time);

        res.status(201).json({success: true, data: new_card});
        return {success: true, data: new_card};
    }catch (error){
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.deleteCard = async (req, res) => {
    try{
        const card_id = req.body;
        const card = await Card.findById(card_id);
        await Card.findByIdAndDelete(card_id);
        res.status(201).json({success: true, data: card})
    }catch (err){
        res.status(500).json({success: false, message: err.message});
    }
}

exports.getCards = async (req, res) => {
    try{
        const cards = Card.find();
        res.status(201).json({succes: true, cards: cards});
        return res.json({success: true, cards: cards});
    }catch (err){
        res.status(500).json({success: false, message: err.message});
    }
}