const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = global.Promise;

if (!mongoose.connection.readyState) mongoose.connect(config.dbpath, {useMongoClient: true});
mongoose.connection.on('error', (err) => console.error(`MongoDB connection error: ${ err}`));
mongoose.connection.on('open', () => console.info(`Connection sucess to ${ config.dbpath}`));

module.exports = mongoose;
