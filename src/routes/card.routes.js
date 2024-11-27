const authMiddleware = require("../middlewares/auth.middleware.js");
const cardControllers = require('../controllers/card.controllers.js');
const router = require('express').Router();

router.post('/post', authMiddleware, cardControllers.postCard);
router.delete('/delete', authMiddleware, cardControllers.deleteCard);
router.get('/get-cards', authMiddleware, cardControllers.getCards);
router.get('/get-cards-by-category', authMiddleware, cardControllers.getCardsByCategory);
router.get('/get-my-cards', authMiddleware, cardControllers.getMyCards);
router.put('/modify', authMiddleware, cardControllers.updateCard);

module.exports = router;
