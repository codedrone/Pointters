const { updateIfExistsAndCreateIfNot } = require('../../../../stores/user');


module.exports = async(ctx, { idFacebook, firstName, lastName }) => {
    const queryToFindUser = {
        'socialNetwork.name': 'facebook',
        'socialNetwork.id': idFacebook
    };
    const data = {
        password: idFacebook,
        socialNetwork: {
            name: 'facebook',
            id: idFacebook
        },
        firstName,
        lastName
    };
    return (await updateIfExistsAndCreateIfNot(queryToFindUser, data))[0];
};
