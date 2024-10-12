const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// POST /api/v1/user/signup
router.post('/signup', [
    body('username').isLength({ min: 1 }),
    body('email').isLength({ min: 1 }),
    body('password').isLength({ min: 1 })
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(422).json({ status: false, message: errorMessages });
    }
    next();
}, signupUser);

// POST /api/v1/user/login
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

module.exports = router;

