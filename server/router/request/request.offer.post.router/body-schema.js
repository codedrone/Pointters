const joi = require('joi');


const workDurationUom = [ 'hour', 'day', 'week' ];

module.exports = joi.object().keys({
    fulfillmentMethod: joi.object().keys({
        local: joi.boolean(),
        online: joi.boolean(),
        shipment: joi.boolean(),
        store: joi.boolean(),
        localServiceRadius: joi.number(),
        localServiceRadiusUom: joi.string()
    }),
    location: joi.object().keys({
        city: joi.string(),
        country: joi.string(),
        geoJson: joi.object().keys({
            type: joi.string().required(),
            coordinates: joi.array().items(joi.number()).length(2).required()
        }),
        postalCode: joi.string(),
        province: joi.string(),
        state: joi.string()
    }),
    media: joi.object(),
    price: joi.object(),
    workDuration: joi.object(),
    workDurationUom: joi.string().valid(workDurationUom)
});
