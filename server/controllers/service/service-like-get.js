const { get: getToLikes } = require('../../../stores/user/likes');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
const errorInGetLikes = 'Error in get to likes';

module.exports = async(ctx) => {
    console.log('ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(400, errorMessage);

    const likes = await getToLikes(ctx.queryToFindUserById);

    if (likes.error) ctx.throw(500, errorInGetLikes);

    ctx.body = { likes: new Set(likes).has(ctx.params.idService) };
};
