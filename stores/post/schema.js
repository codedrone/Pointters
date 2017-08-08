module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: Date,
    message: String,
    media: Object,
    tags: [ String ],
    updatedAt: Date
};
