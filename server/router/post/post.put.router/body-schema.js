const joi = require('joi');


module.exports = joi.object().keys({
    message: joi.string(),
    media: joi.object(),
    tags: joi.array().items(joi.string().required()),
});
