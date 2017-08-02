const { updateIfExistsAndCreateIfNot } = require('../../../../stores/user');


module.exports = async (ctx, { idFacebook, firstName, lastName }) => {
    const queryToFindUser = {
        email: ctx.request.body.email,
        password: idFacebook
    };
    const data = {
        email: ctx.request.body.email,
        password: idFacebook,
        firstName,
        lastName
    };
    return (await updateIfExistsAndCreateIfNot(queryToFindUser, data))[0];
};
