module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    postId: {
        type: String,
        required: true,
        index: true,
        ref: 'post'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
    comment: String,
    updatedAt: Date
};
