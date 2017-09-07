const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

module.exports = (client) => async(mediaId, media) => {
    const post = await client.findOne({'media._id':mediaId}, {media:1});
    Object.assign(post.media, media);
    return await catchingErrorFromPromise(post.save());
};