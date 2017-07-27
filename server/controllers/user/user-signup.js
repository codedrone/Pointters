const {save : saveUser} = require('../../../stores/user');
const signToken = require('../../lib/sign-token');

const successMessage = 'Successful created a new user.';
const failedMessage = 'Email already exists.';
module.exports = (req, res) => saveUser({
    email: req.body.email,
    password: req.body.password
})
    .then((savedUser) => {
        const token = signToken(savedUser._id, savedUser.email);
        res.json({success: true, id: savedUser._id, msg: successMessage, token: token});
    })
    .catch(() => res.json({success: false, msg:failedMessage}));

