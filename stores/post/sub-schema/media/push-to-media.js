const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, media) => catchingErrorFromPromise(
    client.findOneAndUpdate(query, {
        $push:{media}
    }, {new:true})
);
