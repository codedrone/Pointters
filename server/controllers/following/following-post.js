const { create } = require('../../../stores/following');
const { findOne } = require('../../../stores/user');

module.exports = async (ctx) => {
	user = await findOne({ _id: ctx.params.idUser });
console.log(user);
	if(!user || user.error) ctx.throw(404, "Error in find User");

    const following = await create({ followTo: ctx.params.idUser, followFrom: ctx.session.id });

    if (!following || following.error) ctx.throw(404, "Create Error");

    ctx.body = { success: true, following };
};
