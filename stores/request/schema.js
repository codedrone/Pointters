const {Schema} = require('mongoose');
const subschemas = require('./sub-schemas');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    category: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date, default: new Date()
    },
    currencyCode: {
        type: String
    },
    currencySymbol: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: {
        type: Object
    },
    media: [subschemas.media.schema],
    minPrice: {
        type: Number
    },
    maxPrice: {
        type: Number
    },
    scheduleDate: Date,
    updatedAt: {
        type: Date, default: new Date()
    }
};
