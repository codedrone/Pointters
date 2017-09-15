const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => (query, subCategory) => catchingErrorFromPromise(
    (async() => {
        const doc = await client.findOne(query);
        if (!doc) return {error:new Error('Category does not exists')};
        doc.subCategories.push(subCategory);
        const saved = await doc.save();
        const savedPlane = saved.toObject();
        savedPlane.subCategories.forEach((sub) => {
            sub._id = sub._id.toString();
        });
        return {subCategories:savedPlane.subCategories};
    })());
