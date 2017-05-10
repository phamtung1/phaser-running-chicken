(function () {

	var GRAVITY = 800;
	var JUMP_POWER = -350;
	var RUN_SPEED = 170;
	var JUMP_SPEED = 0;
	var LEDGE_WIDTH = 90;
	var PLAYER_WIDTH = 30;
	var _player;
	var _score = 0;
	var _scoreText;
	var _ledgeGroup;
	var _isFirstJump = false;
	var _lastLedgeX = 0;
	var _jumpSound;
	var _shoutSound;
	var _timer;
	var _flyingBird;

	RunningChickenGame.GameState = {
		create: function () {
			game.add.image(0, 0, 'background')
			_jumpSound = game.add.audio('jump')
			_shoutSound = game.add.audio('shout')
			_score = 0;
			_ledgeGroup = game.add.group();
			_scoreText = game.add.text(10, 10, "-", {
				font: "bold 16px Arial"
			});
			game.stage.backgroundColor = "#87CEEB";
			game.physics.startSystem(Phaser.Physics.ARCADE);
			_flyingBird = game.add.sprite(game.world.centerX, 0, "bird");
			game.physics.arcade.enable(_flyingBird);
			_flyingBird.checkWorldBounds = true;
			_flyingBird.outOfBoundsKill = true;
			_flyingBird.x = -_flyingBird.width;
			_flyingBird.y = 0;
			_flyingBird.animations.add('walk');
			_flyingBird.animations.play('walk', 20, true);
			_flyingBird.kill();

			_player = game.add.sprite(game.world.centerX, 0, "player");
			_player.animations.add('walk');
			_player.animations.play('walk', 30, true);
			game.physics.arcade.enable(_player);
			_player.body.gravity.y = GRAVITY;
			_player.body.velocity.x = RUN_SPEED;
			game.input.onDown.add(jump, this);
			var offsetX = 6 * LEDGE_WIDTH;
			var ledgeLength = 11;
			for (var i = 0; i < ledgeLength; i++) {
				_lastLedgeX = offsetX + i * LEDGE_WIDTH;
				var ledge = new Ledge(game, offsetX + i * LEDGE_WIDTH, game.rnd.between(250, 380));
				ledge.body.velocity.x = -RUN_SPEED;
				game.add.existing(ledge);
				_ledgeGroup.add(ledge);;
			}

			_lastLedgeX = ledgeLength * LEDGE_WIDTH;
			updateScore();
			_timer = game.time.create();
			_timer.loop(1000, updateScore, this);
			_timer.start();
		},
		update: function () {
			if (!_player.alive) {
				return;
			}
			game.physics.arcade.collide(_player, _ledgeGroup);
			if (_player.y > game.height) {
				die();
				return;
			}
			_player.body.velocity.x = _player.body.velocity.y === 0 ? RUN_SPEED : JUMP_SPEED
			// check to kill and add new ledge
			_ledgeGroup.forEach(function (item) {
				if (item.x < -item.width) {
					_lastLedgeX = _lastLedgeX + PLAYER_WIDTH * game.rnd.between(-1, 3);
					item.x = _lastLedgeX;
					item.y = game.rnd.between(250, 380)
					return false;
				}
			});
		},
		render: function () {
			//	game.debug.text("gravity: " + _player.body.velocity.y, 10, 10);
			// game.debug.text("last Ledge X: " + _lastLedgeX, 10, 40);
		}
	};
	function showFlyingBird() {
		_flyingBird.tint = Math.random() * 0xffffff;
		_flyingBird.reset(0, y = game.rnd.between(10, 350));
		_flyingBird.body.velocity.x = 100;
	}
	function updateScore() {
		if (_flyingBird.alive == false && game.rnd.between(0, 4) == 0) {
			showFlyingBird();
		}
		if (_player.body.velocity.x == 0) {
			_score++;
		}
		_scoreText.text = "Score: " + (_score) + "m";

	}

	function jump() {
		if (_player.body.velocity.y == 0 || _isFirstJump) {
			_jumpSound.play()
			_isFirstJump = _player.body.velocity.y == 0;
			_player.body.velocity.y = JUMP_POWER;
		}
	}

	function die() {
		_timer.stop();

		_player.kill();
		_shoutSound.play();

		game.score = _score;
		game.playername = prompt("Please enter your name", game.playername || "Anonymous");
		game.add.text(game.world.centerX, 100, 'Game Over', { font: '40px Arial', fill: '#000' }).anchor.set(0.5);
		var playerRef = firebase.database().ref("scores/" + game.playername);
		var firebaseRef = firebase.database().ref("scores/");
		playerRef.once("value", (snapshot) => {
			var data = snapshot.val();
			if (data == null || data.score < game.score) {
				// update score
				var date = new Date();
				firebaseRef.update({
					[game.playername]: {
						name: game.playername,
						score: game.score,
						update: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
						order: -game.score
					}
				});
			}

			setTimeout(() => {
				game.state.start("GameOverState");
			}, 100)

			return false;
		});
	}
}());