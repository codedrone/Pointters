const auth = require('../../../services/auth.service');

const messageUserNotFound = 'Authentication failed. User not found.';
const messageAuthenticationFailed = 'Authentication failed. Wrong password.';

module.exports = (password, res) => (user) => {
    if (!user) return res.send({success: false, msg: messageUserNotFound});
    user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
            const token = auth.signToken(user._id, user.email);
            res.status(200);
            return res.json({success: true, token: token});
        }
        res.send({success: false, msg: messageAuthenticationFailed});
    });
};
