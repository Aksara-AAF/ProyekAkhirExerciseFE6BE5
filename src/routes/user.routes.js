const authMiddleware = require("../middlewares/auth.middleware.js");
const userControllers = require('../controllers/user.controllers.js');
const router = require('express').Router();

router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/get-my-info', authMiddleware, userControllers.get_my_info);
router.get('/get-user-info', authMiddleware, userControllers.get_user_info_from_their_card);

module.exports = router;
