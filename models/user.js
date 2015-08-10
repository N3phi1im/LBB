
// Declare Dependencies

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// User Template

var UserSchema = new mongoose.Schema({
	username: { type: String, lowercase: true, unique: true},
	email: {type: String, unique: true, lowercase: true},
	passwordHash: String,
	salt: String
});

// Function to set password Hash and Salt

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Function to Validate pasword Hash and Salt

UserSchema.methods.validatePassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return (hash === this.passwordHash);
};

// Generate and send JWT to user

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 1);
	return jwt.sign({
		id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, 'bananas');
};

// Module ready for use

mongoose.model('User', UserSchema);
