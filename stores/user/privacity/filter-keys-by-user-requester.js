const {propsToBeEverPrivate = ''} = require('../../../config');

const filterEverForPrivacity = new RegExp(propsToBeEverPrivate.replace(/,/g, '|'));

module.exports = (userToFilter, userRequester) => {
    const {settings = {}} = userToFilter;
    const requesterIsFollower = new Set(userRequester.following)
        .has(userToFilter._id);
    return Object.keys(userToFilter)
        .filter((prop) => {
            console.log('prop  ', prop);
            const permission = settings[`${prop}ViewPermission`] || 'public';
            console.log('permission  ', permission);

            if (filterEverForPrivacity.test(prop)) return false;
            console.log('is not hiden');

            if (requesterIsFollower) return permission === 'followers';

            return permission !== 'onlyme';
        })
        .reduce((filtered, key) => {
            filtered[key] = userToFilter[key];
            return filtered;
        }, {});
};
