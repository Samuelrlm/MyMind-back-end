const connection = require('../models/connection');
const bcrypt = require('bcrypt');

const validadeAuth = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

    const user = await connection.query(
        'SELECT * FROM users WHERE email = $1', [email]
    );

    if (!user.rows[0]) return res.status(401).json({ message: 'Incorrect username or password' });

    const passwordIsValid = bcrypt.compareSync(password, user.rows[0].password);

    if (!passwordIsValid) return res.status(401).json({ message: 'Incorrect username or password' });

    next();
}

module.exports = {
    validadeAuth
};