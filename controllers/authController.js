const user = require('../models/Users');

const loginUser = async (req, res) => {
    const user = await user.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });
}

module.exports = {
    loginUser
}