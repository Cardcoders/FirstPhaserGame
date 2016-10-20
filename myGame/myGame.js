/*global Phaser*/ 

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update }); function preload() { } function create() { } function update() { }

function preload() {
    
    game.load.image('cave', 'assets/cave.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
    game.load.image('firstaid', 'assets/firstaid.png');
}

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, 'diamond');
    
    game.add.sprite(0, 0, 'cave');
    
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
    
    player = game.add.sprite(32, game.world.height -150, 'dude');
    
    two = game.add.sprite(700, game.world.height -150, 'dude');
    
    bad = game.add.sprite(300, game.world.height -95, 'baddie');
    

  
    game.physics.arcade.enable(player);
    
    game.physics.arcade.enable(two);
  
    player.body.bounce.y =  0.3;
  
    player.body.gravity.y = 200;
  
    player.body.collideWorldBounds = true;
  
    two.body.bounce.y =  0.3;
  
    two.body.gravity.y = 200;
  
    two.body.collideWorldBounds = true;
  
   
    player.animations.add('left', [0, 1, 2, 3], 10, true);
   
    player.animations.add('right', [5, 6, 7, 8], 10, true);
   
    two.animations.add('left', [0, 1, 2, 3], 10, true);
   
    two.animations.add('right', [5, 6, 7, 8], 10, true);
   
    cursors = game.input.keyboard.createCursorKeys();
    
    wasd = game.input.keyboard.createCursorKeys();
    
    diamonds = game.add.group();
    
    diamonds.enableBody = true;
    
    for (var i = 0; i < 12; i++)
    {
        var diamond = diamonds.create(i * 70, 0, 'diamond');
        
        diamond.body.gravity.y = 6;
        
        diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16, 16, '$$DIAMONDS$$: 0', { fontSize: '32px', fill: '#000'});

    score = 0;
    
    score2Text = game.add.text(450, 16, '$$DIAMONDS$$: 0', { fontSize: '32px', fill: '#000'});

    score2 = 0;
    
    livesText = game.add.text(16, 40, 'Lives: 3', { fontSize: '32px', fill: '#000'});
    
    lives = 3
    
    liveText = game.add.text(450, 40, 'Lives: 3', { fontSize: '32px', fill: '#000'});

    live = 3

    byJoey = game.add.text(300, 250, 'Diamond Run', { fontSize: '50px', fill: '#000'});
}

var b = game.input.keyboard.addKey(Phaser.Keyboard.B);

var timer = 0;

var timer2 = 0;

var live

var liveText

var auto

function update() {
    
    if (b.isDown)
    {
        if (score === 100)
        {
            
        }
    }
    
    timer2++;
    
    livesText.text = 'Lives:' + lives;
    
    if (timer2 > 10000000)

    
    if (diamonds > 100)
    {
        lives += 1;
    }
    
    timer++;
    
    firstaid = game.add.sprite(32, game.world.height -150, 'firstaid')
    
    if(timer > 300){
            for (var i = 0; i < 12; i++)
    {
        var diamond = diamonds.create(i * 70, 0, 'diamond');
        
        diamond.body.gravity.y = 6;
        
        diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    timer = 0;
    }
    


    var hitPlatform = game.physics.arcade.collide(player, platforms);
    
    hitPlatform = game.physics.arcade.collide(two, platforms);
  
    player.body.velocity.x = 0;

    two.body.velocity.x = 0;
    
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;
        
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;
        
        player.animations.play('right');
    }
    else 
    {
        player.animations.stop ();
        
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

    var a = game.input.keyboard.addKey(Phaser.Keyboard.A);

    var d = game.input.keyboard.addKey(Phaser.Keyboard.D);

    var w = game.input.keyboard.addKey(Phaser.Keyboard.W);

    if (a.isDown)
    {
        two.body.velocity.x = -200;
        
        two.animations.play('left');
    }
    else if (d.isDown)
    {
        two.body.velocity.x = 200;
        
        two.animations.play('right');
    }
    else 
    {
        two.animations.stop ();
        
        two.frame = 4;
    }
    if (w.isDown && two.body.touching.down && hitPlatform)
    {
        two.body.velocity.y = -350;
    }
    game.physics.arcade.collide(diamonds, platforms);

    game.physics.arcade.overlap(player, diamonds, collectStar, null, this);

    game.physics.arcade.overlap(two, diamonds, collectStar2, null, this);

}

function collectStar (player, star){
    
    star.kill();
    score += 1;
    scoreText.text = '$$DIAMONDS$$: ' + score;

}

function collectStar2 (two, star){
    
    star.kill();
    score2 += 1;
    score2Text.text = '$$DIAMONDS$$: ' + score2;

}

function collectFirstaid (player, firstaid){
    
    firstaid.kill();
    lives += 1;
    livesText.text = 'Lives:' + lives;
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

var byJoey;

var firstaid;

var two;

var wasd;

var score2Text

var score2