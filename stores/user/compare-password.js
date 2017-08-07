const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

const bcrypt = require('bcrypt');


module.exports = (passw, hash) => catchingErrorFromPromise(bcrypt.compare(passw, hash));
