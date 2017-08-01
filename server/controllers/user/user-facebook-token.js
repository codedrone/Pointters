const { findOne, updateIfExistsAndCreateIfNot } = require('../../../stores/user');
const signToken = require('../../lib/sign-token');
const getHeaders = require('../../lib/get-headers');
const getSession = require('../../lib/get-session');
const validateFacebookToken = require('../../../services/validate-token-facebook');

const successMessage = 'Successful created a new user.';
module.exports = async(ctx) => {
    const { name, id: idFacebook } = await validateFacebookToken(ctx.request.body.token);
    const savedUser = await findOne({
        email: ctx.request.body.email,
        password: idFacebook
    });
    let userCreatedOrUpdated = [];
    const [ firstName, lastName ] = name.split(' ');
    if (!savedUser) {
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
        userCreatedOrUpdated = await updateIfExistsAndCreateIfNot(queryToFindUser, data);
    }
    const paramsToGetToken = { id: userCreatedOrUpdated[0]._id, email: userCreatedOrUpdated[0].email };
    const token = signToken(paramsToGetToken);
    const headers = getHeaders();
    ctx.response.set(headers);
    ctx.session = getSession(userCreatedOrUpdated[0]);
    ctx.body = { success: true, id: userCreatedOrUpdated[0]._id, msg: successMessage, token: token };
};

