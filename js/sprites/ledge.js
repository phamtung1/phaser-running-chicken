class Ledge extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, "ledge");
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
    }
}