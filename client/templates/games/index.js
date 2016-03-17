Template.gameList.helpers({
    currentGames: function () {
        return App.collections.games.find({
            complete: false
        }).fetch();
    },
    completedGames: function () {
        return App.collections.games.find({
            complete: true
        }).fetch();
    }
});
