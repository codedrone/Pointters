module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,         default: new Date()
    },
    fulfillmentMethod: {
        type: Object
    },
    location: {
        type: Object
    },
    media: {
        type: Object
    },
    price: {
        type: Object
    },
    serviceId: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date,         default: new Date()
    },
    workDuration: {
        type: Object
    },
    workDurationUom: {
        type: String,
        enum: [ 'hour', 'day', 'week' ]
    },
};
