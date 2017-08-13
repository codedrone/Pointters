const joi = require('joi');


module.exports = joi.object().keys({
    idPost: joi.string().required(),
    idComment: joi.string().required()
});
