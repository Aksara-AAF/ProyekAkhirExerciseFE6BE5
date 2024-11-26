const authMiddleware = require("../middlewares/auth.middleware.js");
const cardControllers = require('../controllers/card.controllers.js');
const router = require('express').Router();

router.post('/post', authMiddleware, cardControllers.postCard);
router.delete('/delete', authMiddleware, cardControllers.deleteCard);
router.get('/get-cards', authMiddleware, cardControllers.getCards);

module.exports = router;
