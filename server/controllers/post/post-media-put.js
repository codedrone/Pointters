const { put: putToMedias } = require('../../../stores/post/sub-schema/media');

module.exports = async(ctx) => {
    const res = await putToMedias({
        _id: ctx.params.idPost
    }, {
        _id: ctx.params.idMedia
    },
    ctx.request.body);

    if (res.error) ctx.throw(404, res.error.message);

    ctx.body = { success: true };
};
