const joi = require('joi');


module.exports = joi.object().keys({
    category:joi.object(),
    location:joi.object(),
    media:joi.object(),
    minPrice:joi.number().min(0),
    maxPrice:joi.number(),
    serviceId:joi.string(),
    scheduleDate:joi.number(),
});
