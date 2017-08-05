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
    media: {
        type: {},
    },
    pricing: {
        type: {}
    },
    fulfillmentMethod: {
        type: {}
    }
};
