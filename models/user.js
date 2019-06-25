const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Virtual Property/ attribute for password confirmation
UserSchema.virtual('passwordConfirmation')
    .get(() => this.passwordConfirmation)
    .set(value => this.passwordConfirmation = value);

//Our hook operation
UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();
    if (user.password !== user.passwordConfirmation) throw new Error('Your passwords do not match.');

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) next(err);

            user.password = hash;
            next();
        });
    });
});

//Our helper method 
//This will allow us to compare our password to plain text
UserSchema.methods.authenticate = function (plainPassword, callback) {
    console.log('GOT HERE');
    //plain text, hash, callback
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) {return callback(err);}
        callback(null, isMatch);
    });
};



module.exports = mongoose.model('User', UserSchema);