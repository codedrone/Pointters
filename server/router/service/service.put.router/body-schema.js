const joi = require('joi');


module.exports = joi.object().keys({
    category: joi.object(),
    description: joi.string(),
    media: joi.object(),
    pricing: joi.object(),
    fulfillmentMethod: joi.object()
});
