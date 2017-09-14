const joi = require('joi');


module.exports = joi.object().keys({
    userId: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});
