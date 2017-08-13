<<<<<<< HEAD
<<<<<<< HEAD
const { review: { minLengthForComment } } = require('../../config');
=======
>>>>>>> the test to get review is added
=======
const { review: { minLengthForComment } } = require('../../config');


>>>>>>> the post and comment store is added
module.exports = {
    userId: {
        type: String,
        requied: true
    },
    comment: {
<<<<<<< HEAD
<<<<<<< HEAD
        type: String,
        minlength: minLengthForComment
=======
        type: String
>>>>>>> the test to get review is added
=======
        type: String,
        minlength: minLengthForComment
>>>>>>> the post and comment store is added
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
