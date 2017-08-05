const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const bcrypt = require('bcrypt');
const schema = require('./schema');
const UserSchema = new Schema(schema);

UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password') && !user.isNew) return next();

    bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch(next);
});

UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('tempPassword') && !user.isNew || !user.tempPassword) return next();

    bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(user.tempPassword, salt))
        .then((hash) => {
            user.tempPassword = hash;
            next();
        })
        .catch(next);
});

UserSchema.index({ 'sociaNetwork.name': 1, 'socialNetwork.id': 1 });
UserSchema.index({ email: 1 }, { unique: true, sparse: true });

module.exports = mongo.model('user', UserSchema);
