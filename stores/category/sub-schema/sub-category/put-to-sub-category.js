const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, subCategories) => {
    const post = await client.findOne(query, {subCategories:1});

    if (!post) return {};

    post.subCategories.forEach((_subCategories) => {
        _subCategories.keyword = _subCategories.keywords.concat(subCategories.keywords);
        if (subCategories.name) _subCategories.name = subCategories.name;
    });
    return await catchingErrorFromPromise(post.save());
};
