const joi = require('joi');


module.exports = joi.object().keys({
    token: joi.string().required(),
    email: joi.string().email().required()
});
