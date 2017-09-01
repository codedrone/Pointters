module.exports = {
    userId: {
        type: String,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date
    }
};