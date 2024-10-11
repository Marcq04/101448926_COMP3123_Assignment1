const express = require('express');
const { loginUser } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// POST /login
router.post('/login', [
    body('username').isLength({ min: 1 }),
    body('password').isLength({ min: 1 })
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(422).json({ status: false, message: errorMessages });
    }
    next();
}, loginUser);

module.exports = router