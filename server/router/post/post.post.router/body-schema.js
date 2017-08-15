const joi = require('joi');


module.exports = joi.object().keys({
    message: joi.string().required(),
    media: joi.object(),
    tags: joi.array().items(joi.string().required())
});
