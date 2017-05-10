RunningChickenGame.MenuState = {
    create() {
        game.add.image(0, 0, 'background')
        game.stage.backgroundColor = "#87CEEB";
        game.add.text(game.world.centerX, 200, 'Running Chicken', { font: '40px Arial', fill: '#000' }).anchor.set(0.5);
        game.add.text(game.world.centerX, 250, 'Tap to continue', { font: '20px Arial', fill: '#000' }).anchor.set(0.5);
        game.input.onDown.add(this.startGame, this);
    },
    startGame() {
        game.state.start('GameState')
    }
}
