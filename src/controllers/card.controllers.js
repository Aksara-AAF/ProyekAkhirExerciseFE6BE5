const Card = require("../models/card.model");
const User = require("../models/user.model");
exports.postCard = async (req, res) => {
    try{
        const user_id = req.user;
        const userr = await User.findById(user_id.id);
        const {title, message, time_limit, category} = req.body;
        const new_card = await new Card({username: userr.username, permintaan: message, title: title, category: category});
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

        res.status(201).json({success: true, message: "Successfully posted card", data: new_card});
        return {success: true, message: "Successfully posted card", data: new_card};
    }catch (error){
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.getCardsByCategory = async (req, res) => {
    try{
        const userr = req.user;
        const category = req.body;
        const cards = await Card.find({ category: category });
        if (cards.length === 0){
            res.status(201).json({success: false, message: "There are no cards with this category"});
            return {success: false, message: "There are no cards with this category"};
        }

        res.status(201).json({success: true, message: "Successfully retrieved the cards", data: cards});
        return {success: true, message: "Successfully retrieved the cards", data: cards};
    }catch (err){
        res.status(500).json({success: false, message: err.message});
        console.log(err.message);
    }
}

exports.getMyCards = async (req, res) => {
    try{
        const userr = req.user;
        const user = await User.findById(userr.id);
        const cards = await Card.find({ username: user.username });
        if (cards.length === 0){
            res.status(201).json({success: false, message: "You currently have no cards"});
            return {success: false, message: "You currently have no cards"};
        }

        res.status(201).json({success: true, message: "Successfully retrieved my cards", data: cards});
        return {success: true, message: "Successfully retrieved my cards", data: cards};
    }catch (err){
        res.status(500).json({success: false, message: err.message});
        console.log(err.message);
    }
}

exports.updateCard = async (req, res) => {
    try{
        const user = req.user;
        const {card_id, new_message, status, category} = req.body;
        const card = await Card.findById(card_id);
        card.message = new_message;
        card.status = status;
        card.category = category;
        await card.save();
        res.status(201).json({success: true, message: "Successfully updated the card", data: card});
        return {success: true, message: "Successfully updated the card", data: card};
    }catch (err){
        res.status(500).json({success: false, message: err.message});
        console.log(err.message);
    }
}

exports.deleteCard = async (req, res) => {
    try{
        const card_id = req.body;
        const card = await Card.findById(card_id);
        await Card.findByIdAndDelete(card_id);
        res.status(201).json({success: true, message: "Successfully deleted the card", data: card})
    }catch (err){
        res.status(500).json({success: false, message: err.message});
        console.log(err.message);
    }
}

exports.getCards = async (req, res) => {
    try{
        const cards = await Card.find();
        res.status(201).json({succes: true, message: "Successfully retrieved all cards", cards: cards});
        return {success: true, message: "Successfully retrieved all cards", cards: cards};
    }catch (err){
        console.log(err.message);
        res.status(500).json({success: false, message: err.message});
    }
}

