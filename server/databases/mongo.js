const mongoose = require('mongoose');
const config = require('../config')();
mongoose.Promise = Promise;

if (!mongoose.connection.readyState) mongoose.connect(config.dbpath, {useMongoClient: true});
mongoose.connection.on('error', (err) => {
    return console.error(`MongoDB connection error: ${ err}`);
});

module.exports = mongoose;
