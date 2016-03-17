App.collections.games = new Mongo.Collection('games');

//console.log(App.schemaHelpers.createdAt);

var schema = new SimpleSchema({
    playerIds: App.schemaHelpers.playerIds,
    complete: {
        type: Boolean,
        defaultValue: false
    },
    winnerIds: {
        type: [String],
        defaultValue: []
    },
    createdAt: App.schemaHelpers.createdAt,
    createdBy: App.schemaHelpers.createdBy
});

App.collections.games.attachSchema(schema);



Meteor.methods({
    createGame: function (doc) {
        // doc is from autoform.

        // Only logged in users can create.
        if (this.userId) {

            check(doc.playerIds, [String]);

            var playerIds = doc.playerIds;

            // Make sure the current user is in the list.
            if (playerIds.indexOf(this.userId) == -1) {
                playerIds.push(this.userId);
            }

            // Create the game record.
            var gameId = App.collections.games.insert({
                playerIds: playerIds
            });

            if (gameId) {
                // Create game object.
                var game = new App.games.RPS({
                    playerIds: playerIds,
                    targetScore: 2
                });

                // Create the first turn record with initial state.
                App.collections.turns.insert({
                    gameId: gameId,
                    turnNumber: 1,
                    state: game.state
                });
            }

            return gameId;
        }
    },

    clear: function () {
        App.collections.games.remove({});
        App.collections.turns.remove({});
    }
});
