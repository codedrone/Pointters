module.exports = {
    userId: {
        type: String,
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
    media: {
        type: {},
        required: true
    },
    pricing: {
        type: {},
        required: true
    },
    fulfillmentMethod: {
        type: {},
        required: true
    },
    createdAt: Date
};
