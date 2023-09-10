const connection = require('./connection');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const createUser = async (name, email, password) => {
    const hashPassword = bcrypt.hashSync(password, 10);

    const token = uuidv4();

    try {
        await connection.query(
            'INSERT INTO users (nome, email, password) VALUES ($1, $2, $3)', [name, email, hashPassword]
        );
        
        const getUser = await connection.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        const userRes = getUser.rows[0];
        
        await connection.query(
            'INSERT INTO tokens (token, user_id) VALUES ($1, $2)', [token, userRes.id]
        );

        const userData = {
            id: userRes.id,
            name: userRes.nome,
            email: userRes.email,
            token: token
        }

        return userData;

    } catch (error) {
        return error;
    }
}

module.exports = {
    createUser
};