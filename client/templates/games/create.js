AutoForm.addHooks('createGameForm', {
    onSuccess: function (formType, result) {
        // Result is gameId so redirect there.
        FlowRouter.go('game.single', {
            gameId: result
        });
    }
});
