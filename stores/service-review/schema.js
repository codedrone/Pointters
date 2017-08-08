const { review: { minLengthForComment } } = require('../../config');


module.exports = {
    userId: {
        type: String,
        requied: true
    },
    comment: {
        type: String,
        minlength: minLengthForComment
    },
    createdAt: {
        type: Date
    },
    qualityOfService: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5]
    },
    overallRating: {
        type: Number,
        max: 100,
        min: 0,
        default: 0
    },
    serviceId: {
        type: String,
        required: true
    },
    willingToBuyServiceAgain: Boolean
};
