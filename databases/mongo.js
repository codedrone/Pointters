const mongoose = require('mongoose');

const debug = require('../lib/debug');
const config = require('../config');
mongoose.Promise = global.Promise;

if (!mongoose.connection.readyState) mongoose.connect(config.dbpath, { useMongoClient: true });
mongoose.connection.on('error', (err) => debug.db.error(`MongoDB connection error: ${err}`));
mongoose.connection.on('open', () => debug.db.info(`Connection sucess to ${config.dbpath}`));

module.exports = mongoose;
