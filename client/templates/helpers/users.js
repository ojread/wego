// Get a username.
Template.registerHelper('username', function (userId) {
    return Meteor.users.findOne(userId).username;
});
