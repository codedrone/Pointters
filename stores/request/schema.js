module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    category: {
        type: Object
    },
    createdAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: {
        type: Object
    },
    media: {
        type: Object
    },
    minPrice: {
        type: Number
    },
    maxPrice: {
        type: Number
    },
    scheduleDate: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
};
