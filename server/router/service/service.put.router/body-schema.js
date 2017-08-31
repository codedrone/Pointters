const joi = require('joi');


module.exports = joi.object().keys({
    category: joi.object().required(),
    description: joi.string().required(),
    media: joi.array().items(joi.object().keys({
        fileName: joi.string(),
        mediaType: joi.string().valid([ 'image', 'video' ])
    })),
    fulfillmentMethod: joi.object().keys({
        local: joi.boolean(),
        online: joi.boolean(),
        shipment: joi.boolean(),
        store: joi.boolean()
    }),
    geofence: joi.array(),
    location: joi.array().items(joi.object().keys({
        city: joi.string(),
        country: joi.string(),
        latitude: joi.number(),
        longitude: joi.number(),
        postalCode: joi.string(),
        province: joi.string(),
        state: joi.string()
    })),
    prices: joi.array().items(joi.object().keys({
        description: joi.string().required(),
        location: joi.object(),
        price: joi.number(),
        time: joi.number().required(),
        timeUnitOfMeasure: joi.string().valid([ 'hour', 'day', 'week' ]).required()
    }))
});

