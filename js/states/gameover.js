RunningChickenGame.GameOverState = {
    create() {
        game.stage.backgroundColor = "#87CEEB";
        game.add.image(0, 0, 'background')
        game.add.text(game.world.centerX, 100, 'Game Over', { font: '40px Arial', fill: '#000' }).anchor.set(0.5);
        game.add.text(game.world.centerX, 150, 'Your Score: ' + game.score, { font: '20px Arial', fill: '#000' }).anchor.set(0.5);
        game.add.text(game.world.centerX, 200, 'High Scores', { font: '20px Arial', fill: '#000' }).anchor.set(0.5);
        game.add.text(game.world.centerX, game.world.height - 30, 'Tap to continue', { font: '20px Arial', fill: '#000' }).anchor.set(0.5);
        setTimeout(() => {
            game.input.onDown.addOnce(this.startGame, this);
        }, 1000);
        var firebaseRef = firebase.database().ref("scores/");

        var offsetY = 200;
        var count = 1;
        firebaseRef.orderByChild("order").limitToFirst(5).once('value')
            .then(function (snaps) {
                var page = [];
                var extraRecord;
                snaps.forEach(function (childSnap) {
                    var obj = childSnap.val();
                    game.add.text(200, offsetY + count * 50, obj.name, { font: '20px Arial', fill: '#000' });
                    game.add.text(350, offsetY + count * 50, obj.score + "m", { font: '20px Arial', fill: '#000' });
                    game.add.text(400, offsetY + count * 50, obj.update, { font: '20px Arial', fill: '#000' });
                    count++;
                });
            });
    },
    startGame() {
        game.state.start('MenuState')
    }
}
