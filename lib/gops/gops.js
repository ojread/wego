/*
Gops class contains game state and all functions that modify it.

2 ways to set up an instance:
- create a new game with certain players and options
- load a game from saved state and make a move

Constructor takes new game options,
creating empty object if not supplied.
Then you can load() existing state.
This makes the most sense conceptually.

Start game: new Gops({playerIds: []})
Load game: new Gops().load(state)

Should all data be saved within a state property?
I think that would make sense.
State is all the data that can be used to set up everything from
a saved game. Create objects from data if needed.

*/

Gops = function (options) {
    if (options) {
        // Create initial state from options object.
        this.init(options);
    }
    // Otherwise create an empty object ready for state to be loaded.
};

Gops.prototype.init = function (options) {
    //console.log('init', options);
    if (!options) throw 'Options not supplied';
    if (!options.playerIds) throw 'playerIds not supplied';

    var cardCount = 7;

    // Create player objects with hands.
    var players = [];

    for (var i = 0; i < options.playerIds.length; i++) {
        var userId = options.playerIds[i];

        // Create a player object.
        var player = {
            userId: userId,
            hand: [],
            pile: []
        };

        // Add cards to their hand.
        for (var j = 1; j <= cardCount; j++) {
            player.hand.push(j);
        }

        // Save player objects.
        //players[userId] = player;
        players.push(player);
    }

    // Create card decks etc.
    var deck = [];
    for (var i = 1; i <= cardCount; i++) {
        deck.push(i);
    }
    deck = _.shuffle(deck);

    // Save everything to the state prop.
    this.state = {
        deck: deck,
        table: [],
        players: players
    };

    // Deal a prize card.
    this.dealCard();
};

Gops.prototype.load = function (state) {
    // Turn saved data into objects if needed.
    // Could be useful to create deck and card classes.
    this.state = state;
};

Gops.prototype.dealCard = function () {
    // Deal the top card from deck to table.
    var card = this.state.deck[0];
    this.state.table.push(card);
    this.state.deck.splice(0, 1);
};
