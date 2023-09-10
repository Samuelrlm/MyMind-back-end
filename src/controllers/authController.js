const authModel = require('../models/authModel');

const authLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await authModel.authUser(email, password);

    res.status(200).send({
        user
    });
}

module.exports = {
    authLogin
};