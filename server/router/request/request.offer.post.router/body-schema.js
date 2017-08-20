const joi = require('joi');


const workDurationUom = [ 'hour', 'day', 'week' ];

module.exports = joi.object().keys({
    fulfillmentMethod:joi.object(),
    location:joi.object(),
    media:joi.object(),
    price:joi.object(),
    requestId:joi.string().required(),
    workDuration:joi.object(),
    workDurationUom:joi.string().valid(workDurationUom)
});
