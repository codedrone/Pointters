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
    isActive: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date
    }
};
