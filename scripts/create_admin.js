var config = require('../config/config'),
	mongoose = require('mongoose'),
  	chalk = require('chalk');

exports.run = function(app, db, cb) {

	var User = mongoose.model('User');
	var email = 'admin@admin.com' || config.admin.email;
	
	var newUser = new User({
		firstName: 'Admin',
		lastName: 'Account',
		email: email,
		username: 'root' || config.admin.username,
		password: 'root' || config.admin.password,
		provider: 'local',
		roles: ['admin', 'user']
	});

	User.findOne({email: email}, function (err, user) {
		if (err) {
			cb(err);
		}

		if(!user){
			user.save(function (userErr) {
				if (userErr) {
					return cb(userErr);
				}
				console.log(chalk.green('Successfully created Admin Account'));

				cb();
			});
		} else {
			cb('User already exists!');
		}
	});
}
