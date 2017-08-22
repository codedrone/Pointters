module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date
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
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date
    },
    workDuration: {
        type: Object
    },
    workDurationUom: {
        type: String,
        enum: ['hour', 'day', 'week']
    },
};
