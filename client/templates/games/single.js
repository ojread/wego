Template.gameSingle.helpers({
    game: function () {
        var gameId = FlowRouter.getParam('gameId');
        var game = App.collections.games.findOne(gameId);
        return game;
    },
    turn: function () {
        var gameId = FlowRouter.getParam('gameId');
        var turn = App.collections.turns.findOne({
            gameId: gameId,
        }, {
            sort: {
                turnNumber: -1  // Get the higest turn number.
            }
        });
        return turn;
    }
});

Template.gameHand.helpers({
    currentPlayer: function () {
        var userId = Meteor.userId();

        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            if (player.userId === userId) {
                return player;
            }
        }
    }
});

Template.gameHand.events({
    'click .card': function (event) {
        //console.log(event);
        $('.card').removeClass('selected');
        $(event.currentTarget).addClass('selected');
    },
    'click #submitTurn': function (event) {

    }
});

Template.gamePlayers.helpers({
    username: function () {
        var user = Meteor.users.findOne(this.userId);
        return user.username;
    }
});
