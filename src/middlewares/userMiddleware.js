const connection = require('../models/connection');

const validateCreateUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const emailUser =  await connection.query(
        'SELECT * FROM users WHERE email = $1', [email]
    );

    if (emailUser.rows[0]) return res.status(409).json({ message: 'Email already registered' });
    if (!name || !email || !password) return res.status(400).json({ message: 'Invalid entries. Try again.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    if (email.includes('@') === false) return res.status(400).json({ message: 'Invalid email. Try again.' });

    next();
};

module.exports = {
    validateCreateUser
};