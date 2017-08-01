
module.exports = async(ctx) => {
    console.log('session in logout', ctx.session);
    ctx.session = null;
    ctx.status = 200;
};
