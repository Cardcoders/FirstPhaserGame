/*global Phaser*/ var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update }); function preload() { } function create() { } function update() { }

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('sky', 'assets/skyp.png');
    game.load.image('ground', 'assests/star.png');
    game.load.image('star', 'assets/platform.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    
    game.add.sprite(0, 0, 'star');
    
}

function update() {
}
