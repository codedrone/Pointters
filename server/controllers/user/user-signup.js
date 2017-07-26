const {save : saveUser} = require('../../stores/user');
const auth = require('../../services/auth.service');

module.exports = (req, res) => {
    console.log(req.body.json);

    if (!req.body.email || !req.body.password) {
        res.status(202);
        return res.json({success: false, msg: 'Please enter email and password.'});
    }
    saveUser({
        email: req.body.email,
        password: req.body.password
    })
    .then((savedUser) => {
        const token = auth.signToken(savedUser._id, savedUser.email);
        res.json({success: true, id: savedUser._id, msg: 'Successful created a new user.', token: token});
    })
    .catch(() => res.json({success: false, msg: 'Email already exists.'}));
};
