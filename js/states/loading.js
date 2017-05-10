var RunningChickenGame = RunningChickenGame || {};

RunningChickenGame.LoadingState = {
    preload() {
         game.stage.backgroundColor = "#87CEEB";
        game.add.text(game.world.centerX, game.world.centerY, "Loading").anchor.set(0.5);
        //  game.load.spritesheet('player', 'assets/img/player.png', 30, 30)
        game.load.spritesheet('bird', 'img/bird.png', 30, 50);
        game.load.spritesheet('player', 'img/player.png', 30, 30)
        game.load.image('ledge', 'img/ledge.png')
        game.load.image('background', 'img/background.png')
        game.load.audio('jump', 'sound/jump.wav')
        game.load.audio('shout', 'sound/shout.wav')
    },
    create() {
       
        game.state.start('MenuState')
    }
}
