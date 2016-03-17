Template.rpsPlayerListItem.helpers({
    user: function () {
        return Meteor.users.findOne(this.userId);
    }
});

Template.rpsActionForm.events({
    'submit': function (event) {
        event.preventDefault();
        var action = event.currentTarget.action.value;
        Meteor.call('submitTurn', this._id, action);
        event.currentTarget.reset();
    }
});
