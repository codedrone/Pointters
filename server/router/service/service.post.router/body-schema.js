const joi = require('joi');


module.exports = joi.object().keys({
    category: joi.object().required(),
    description: joi.string().required(),
    media: joi.object().required(),
    pricing: joi.object().required(),
    fulfillmentMethod: joi.object().required()
});
