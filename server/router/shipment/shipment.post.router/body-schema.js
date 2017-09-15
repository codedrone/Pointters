const joi = require('joi');

const address = joi.object().keys({
    keywords: joi.array().items(joi.string()),
    name: joi.string().required()
});

module.exports = joi.object().keys({
   
});


