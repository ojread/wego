// Create default users.

Meteor.startup(function () {

	var users = [{
			username: 'ollie',
			password: 'ollie'
		},{
			username: 'tom',
			password: 'tom'
		}, {
			username: 'dick',
			password: 'dick'
		}, {
			username: 'harry',
			password: 'harry'
		}
	];

	if (Meteor.users.find().count() === 0) {
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			var id = Accounts.createUser(user);
			console.log('Created user', user.username);
		}
	}

});
