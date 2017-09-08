const {media:{ push: pushToMedias }} = require('../../../stores/post');

module.exports = async(ctx) => {
    const query = {_id:ctx.params.idPost};
    const res = await pushToMedias(query, ctx.request.body);
    if (res.error) ctx.throw(404, res.error.message);

    ctx.body = { success: true, media: res.media[res.media.length - 1]};
};
