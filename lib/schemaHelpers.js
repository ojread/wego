App.schemaHelpers = {
	createdAt: {
		type: Date,
		autoform: {
			omit: true
		},
		autoValue: function () {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {
					$setOnInsert: new Date()
				};
			} else {
				this.unset();
			}
		}
	},

	createdBy: {
		type: String,
		autoform: {
			omit: true
		},
		autoValue: function () {
			if (this.isInsert) {
				return this.userId;
			}
		}
	},

	playerIds: {
		type: [String],
		label: 'Players',
		autoform: {
			type: 'select-checkbox',
			options: function () {
				return Meteor.users.find({}, {
					sort: {
						username: 1
					}
				}).map(function (user) {
					return {
						label: user.username,
						value: user._id
					}
				});
			}
		}
	}
};
