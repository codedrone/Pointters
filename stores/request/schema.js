const {Schema} = require('mongoose');
const subschemas = require('./sub-schemas');

module.exports = {
    category: {
        type: Object
    },
    createdAt: {
        type: Date, default: new Date()
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: subschemas.location.schema,
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
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    }
};
