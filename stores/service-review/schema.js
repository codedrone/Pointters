const { review: { minLengthForComment } } = require('../../config');
module.exports = {
    userId: {
        type: String,
        requied: true,
        ref: 'user'
    },
    comment: {
        type: String,
        minlength: minLengthForComment
    },
    createdAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    qualityOfService: {
        type: Number,
        enum: [ 0, 1, 2, 3, 4, 5 ]
    },
    overallRating: {
        type: Number,
        max: 100,
        min: 0,
        default: 0
    },
    serviceId: {
        type: String,
        required: true,
        ref: 'service'
    },
    willingToBuyServiceAgain: Boolean
};