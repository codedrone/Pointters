const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, media) => {
    console.log('query ', query)
    console.log('media ', media)
    const post = await client.findOne(query, {media:1});

    if (!post) return {}

    post.media.push(media);
    return await catchingErrorFromPromise(post.save()
        .then((doc) => doc.toObject())
    );
};
