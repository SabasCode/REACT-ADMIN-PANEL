const express = require('express');
const router = express.Router();
const { loginAdmin, registerUser } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/register', registerUser);

module.exports = router;