const joi = require('joi');

module.exports = joi.object().keys({
    orderId:joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    comment: joi.string(),
    qualityOfService: joi.number().valid([ 0, 1, 2, 3, 4, 5 ]),
    overallRating: joi.number().min(0).max(100),
    willingToBuyServiceAgain: joi.boolean().required()
});
