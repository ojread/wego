// Rock paper scissors, the simplest SAS game possible

/*
    options: {
        playerIds: [String],
        turns: Number // How many turns to play
    }
*/

var RPS = function (options) {
    if (options) this.init(options);
};

RPS.prototype.init = function (options) {
    if (!options) throw 'Options not supplied';
    if (!options.playerIds) throw 'playerIds not supplied';
    if (!options.targetScore) throw 'targetScore not supplied';

    // Create player objects.
    var players = [];
    for (var i = 0; i < options.playerIds.length; i++) {
        var userId = options.playerIds[i];
        players.push({
            userId: userId,
            score: 0,
            prevActions: [],
            action: null
        });
    }

    // Save state.
    this.state = {
        players: players,
        currentTurn: 1,
        targetScore: options.targetScore
    }
};

RPS.prototype.load = function (state) {
    this.state = state;
};

// Save the player's action.
RPS.prototype.submitAction = function (userId, action) {
    for (var i = 0; i < this.state.players.length; i++) {
        var player = this.state.players[i];
        if (player.userId === userId) {
            player.action = action;
        }
    }
    // Turn will only process when ready.
    //return this.processTurn();
};

// Have all players submitted an action?
RPS.prototype.readyToProcess = function () {
    for (var i = 0; i < this.state.players.length; i++) {
        var player = this.state.players[i];
        if (null === player.action) {
            return false;
        }
    }
    return true;
};

// If ready, process actions.
RPS.prototype.processTurn = function () {
    if (this.readyToProcess()) {
        // Each player gets a point for each player they beat.
        // This allows more than 2 players.
        var playerCount = this.state.players.length;
        for (var p1 = 0; p1 < playerCount; p1++) {
            for (var p2 = 0; p2 < playerCount; p2++) {
                if (this.beats(
                    this.state.players[p1].action,
                    this.state.players[p2].action
                )) {
                    this.state.players[p1].score++;
                }
            }
        }

        for (var p1 = 0; p1 < playerCount; p1++) {
            // Record the player's action with a single uppercase char.
            var player = this.state.players[p1];
            var letter = player.action.charAt(0).toUpperCase();
            this.state.players[p1].prevActions.push(letter);
            this.state.players[p1].action = null;
        }

        this.state.currentTurn++;

        //this.gameOver();

        return true;
    }
};

// Does action1 beat action2?
RPS.prototype.beats = function (action1, action2) {
    if (action1 === 'rock' && action2 === 'scissors') return true;
    if (action1 === 'paper' && action2 === 'rock') return true;
    if (action1 === 'scissors' && action2 === 'paper') return true;
};

RPS.prototype.gameOver = function () {
    // Does anyone have the target score?
    var winnerIds = [];
    for (var p = 0; p < this.state.players.length; p++) {
        var player = this.state.players[p];
        if (player.score >= this.state.targetScore) {
            winnerIds.push(player.userId);
        }
    }

    if (winnerIds.length > 0) {
        return {
            winnerIds: winnerIds
        };
    } else {
        return false;
    }

};


// Add to app namespace.
App.games.RPS = RPS;
