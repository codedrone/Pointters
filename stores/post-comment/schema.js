module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: Date,
    comment: String,
    updatedAt: Date
};
