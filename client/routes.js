FlowRouter.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render('layout', {
            content: 'home'
        });
    }
});

FlowRouter.route('/games', {
    name: 'game.index',
    action: function () {
        BlazeLayout.render('layout', {
            content: 'gameIndex'
        });
    }
});

FlowRouter.route('/games/start', {
    name: 'game.create',
    action: function () {
        BlazeLayout.render('layout', {
            content: 'gameCreate'
        });
    }
});

FlowRouter.route('/games/:gameId', {
    name: 'game.single',
    action: function () {
        BlazeLayout.render('layout', {
            content: 'gameSingle'
        });
    }
});
