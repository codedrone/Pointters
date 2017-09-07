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
    updatedAt:{
        type: Date,
        default: new Date()
    },
    comment: String,
    createdAt:{
        type: Date,
        default: new Date(),
    }
};
