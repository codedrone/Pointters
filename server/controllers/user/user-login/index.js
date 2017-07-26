const {findOne} = require('../../../../stores/user');


const emailResponseController = require('./email-reponse-controller');

module.exports = (req, res) => {
    findOne({email: req.body.email})
        .then(emailResponseController(req.body.password, res))
        .catch((err) => {
            throw err;
        });
};
