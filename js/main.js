var game = new Phaser.Game(900, 600, Phaser.CANVAS);
game.state.add('LoadingState', RunningChickenGame.LoadingState)
game.state.add('MenuState', RunningChickenGame.MenuState)
game.state.add('GameState', RunningChickenGame.GameState)
game.state.add('GameOverState', RunningChickenGame.GameOverState)
game.state.start('LoadingState')


window.onload = function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCuE1TNfjGKAg3ycTlRTbyaaiMUTfGl2ho",
        authDomain: "running-chicken.firebaseapp.com",
        databaseURL: "https://running-chicken.firebaseio.com",
        projectId: "running-chicken",
        storageBucket: "running-chicken.appspot.com",
        messagingSenderId: "192861585137"
    };
    firebase.initializeApp(config);
};