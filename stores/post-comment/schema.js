module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
<<<<<<< HEAD
=======
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
>>>>>>> the test are not fixed
    createdAt: Date,
    comment: String,
    updatedAt: Date
};
