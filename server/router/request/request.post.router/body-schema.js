const joi = require('joi');


module.exports = joi.object().keys({
    category:joi.object(),
    location:joi.object(),
    media:joi.object(),
    minPrice:joi.number(),
    maxPrice:joi.number(),
    scheduleDate:joi.number()
});
