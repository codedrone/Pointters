const bcrypt = require('bcrypt');


module.exports = (passw, hash) => bcrypt.compare(passw, hash);
