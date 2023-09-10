const userModel = require('../models/userModel');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await userModel.createUser(name, email, password);

    console.log(user)

    res.status(201).send({
        message: 'User created successfully',
        user
    });
}

module.exports = {
    createUser
};