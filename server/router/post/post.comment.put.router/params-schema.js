const joi = require('joi');


module.exports = joi.object().keys({
    idComment: joi.string().required(),
    idPost: joi.string().required()
});
