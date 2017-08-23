const joi = require('joi');


module.exports = joi.object().keys({
    idOder: joi.string().required(),
});
