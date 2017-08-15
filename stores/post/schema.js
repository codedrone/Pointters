module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    message: String,
    media: Object,
    tags: [ String ],
    updatedAt: Date
};
