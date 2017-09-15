const fulfillmentMethod = require('./sub-schemas/fulfillment-method');
const location = require('./sub-schemas/location');
const price = require('./sub-schemas/price');
const media = require('./sub-schemas/media');
const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    category: {
        type: {},
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    shared: {
        originUser: {
            type: String,
            ref: 'user'
        }
    },
    media: [ media ],
    fulfillmentMethod: fulfillmentMethod,
    geofence: {
        type: Array
    },
    location: [ location ],
    prices: [ price ],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
};


