const User = require('../models/user');

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.json({ message: 'User created successfully' });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error occurred during signup' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.json({ message: 'Login successful' });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error occurred during login' });
    }
}

module.exports = {
    signupUser,
    loginUser
}
