const Card = require("../models/card.model");
const User = require("../models/user.model");
exports.postCard = async (req, res) => {
    try{
        const user_id = req.user;
        const userr = await User.findById(user_id.id);
        const {title, message, time_limit} = req.body;
        const new_card = await new Card({username: userr.username, title: title, permintaan: message});
        await new_card.save();
        console.log(new_card);
        res.status(201).json({success: true, data: new_card});
        return {success: true, data: new_card};
    }catch (error){
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