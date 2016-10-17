/*global Phaser*/ 

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update }); function preload() { } function create() { } function update() { }

function preload() {
    
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
    game.load.image('red', 'assets/red.png');

}

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, 'diamond');
    
    game.add.sprite(0, 0, 'sky');
    
    platforms = game.add.group();
    
    platforms.enableBody = true;
    
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    
    ground.scale.setTo(2, 2);
    
    ground.body.immovable = true;
    
    var ledge = platforms.create(-200, 300, 'ground');
    
    ledge.body.immovable = true;
    
    var ledge = platforms.create(600, 150, 'ground');
    
    ledge.body.immovable = true;

    var ledge = platforms.create(600, 400, 'ground');
    
    ledge.body.immovable = true;
    
    var ledge = platforms.create(200, 500, 'ground');
    
    ledge.body.immovable = false;

    red = game.add.group();
    
    red.enableBody = true;

    var ledg = red.create(200, 250, 'red')
    
    ledg.body.immovable = false;

    
    player = game.add.sprite(32, game.world.height -150, 'dude');
    
    bad = game.add.sprite(300, game.world.height -95, 'baddie');
    

  
    game.physics.arcade.enable(player);
  
    player.body.bounce.y =  0.3;
  
    player.body.gravity.y = 100;
  
    player.body.collideWorldBounds = true;
  
   
    player.animations.add('left', [0, 1, 2, 3], 10, true);
   
    player.animations.add('right', [5, 6, 7, 8], 10, true);
   
    cursors = game.input.keyboard.createCursorKeys();
   
    diamonds = game.add.group();
    
    diamonds.enableBody = true;
    
    for (var i = 0; i < 1000; i++)
    {
        var diamond = diamonds.create(i * 70, 0, 'diamond');
        
        diamond.body.gravity.y = 6;
        
        diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16, 16, '$$DIAMONDS$$: 0', { fontSize: '32px', fill: '#000'});

    score = 0;
    
    livesText = game.add.text(16, 40, 'Lives: 3', { fontSize: '32px', fill: '#000'});
    
    lives = 3
    
    byJoey = game.add.text(300, 250, 'Diamond Run', { fontSize: '50px', fill: '#000'});
}


function update() {

    var hitPlatform = game.physics.arcade.collide(player, platforms);
  
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        
        player.animations.play('right');
    }
    else 
    {
        player .animations.stop ();
        
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

    game.physics.arcade.collide(diamonds, platforms);

    game.physics.arcade.overlap(player, diamonds, collectStar, null, this)
    
    
}

function collectStar (player, star){
    
    star.kill();
    score += 1;
    scoreText.text = '$$DIAMONDS$$: ' + score;

}


var platforms;

var player;

var cursors;

var diamonds;

var play;

var scoreText;

var score;

var bad;

var lives;

var livesText;

var byJoey

var red