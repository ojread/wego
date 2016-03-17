// Turns store the game state and player actions.

App.collections.turns = new Mongo.Collection('turns');

var schema = new SimpleSchema({
    gameId: {
        type: String
    },
    turnNumber: {
        type: Number
    },
    state: {
        type: Object,
        blackbox: true
    },
    createdAt: App.schemaHelpers.createdAt
});

App.collections.turns.attachSchema(schema);


Meteor.methods({
    submitTurn: function (turnId, action) {
        // CHECK LOGIN, USER ACCESS ETC.
        // Find the turn record.
        var turn = App.collections.turns.findOne(turnId);
        var state = turn.state;

        // Create an instance of the game using the turn's state.
        var game = new App.games.RPS();
        game.load(state);

        // Update the state with the player's action.
        game.submitAction(this.userId, action);

        //console.log('new state', game);

        // Save the state updated with the action to the turn.
        App.collections.turns.update(turnId, {
            $set: {
                state: state
            }
        });

        // Try to process the turn.
        if (game.processTurn()) {
            // Create a new turn.
            App.collections.turns.insert({
                gameId: turn.gameId,
                turnNumber: turn.turnNumber + 1,
                state: state
            });

            // Get the scores if game is over.
            var endgame = game.gameOver();

            if (endgame) {
                // Update the game record and complete the game.
                App.collections.games.update(turn.gameId, {
                    $set: {
                        complete: true,
                        winnerIds: endgame.winnerIds
                    }
                });
            }
        }
    }
});
