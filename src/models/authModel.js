const connection = require('./connection');

const authUser = async (email) => {
    try{
        const user = await connection.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );
    
        const userRes = user.rows[0];
        
        const token = await connection.query(
            'SELECT token FROM tokens WHERE user_id = $1', [userRes.id]
        );
    
        const userDara = {
            id: userRes.id,
            name: userRes.nome,
            email: userRes.email,
            token: token.rows[0].token
        }
    
        return userDara;
    } catch (error) {
        return error;
    }
}

module.exports = {
    authUser
};