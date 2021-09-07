import nukePositions from './src/nukePositions.js'
import zombieSources from './src/zombieSources.js'
import arrayRandomizer from './src/arrayRandomizer.js';

let config = {
  type: Phaser.AUTO,
  element: 'zombie-game',
  width: 1500,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },   
}   

  let player;
  let platforms;
  let objects;
  let crates;
  let powerup
  let text;
  let timedEvent;

  var game = new Phaser.Game(config);

  // Set up Initial Game State
  const gameState = {
    play: true,
    musicPlaying: false,
    zombiesCreated: 0,
    delay: 3000,
    fireballCreation: 6000,
    deadAnimationPlayed: false,
    remainingLives: 2,
    level: 1,
    nukes: 0,
    timesUp: false,
  };

  function preload() {
    // Load Background

    this.load.image('blackness', 'assets/png/2/blackness.png');
    this.load.image('sky', 'assets/png/2/layers/l1_background.png');
    this.load.image('hills', 'assets/png/2/layers/l2_hills.png');
    this.load.image('clouds', 'assets/png/2/layers/l3_clouds.png');
    this.load.image('ruin', 'assets/png/2/layers/l4_ruin.png');
    this.load.image('ground', 'assets/png/2/layers/l5_ground.png');
    this.load.image('houses', 'assets/png/2/layers/l6_houses.png');
    this.load.image('ground', 'assets/platform.png');

    this.load.image('blackness', 'assets/png/2/blackness.png');
    this.load.image('sky', 'assets/png/2/layers/l1_background.png');
    this.load.image('hills', 'assets/png/2/layers/l2_hills.png');
    this.load.image('clouds', 'assets/png/2/layers/l3_clouds.png');
    this.load.image('ruin', 'assets/png/2/layers/l4_ruin.png');
    this.load.image('ground', 'assets/png/2/layers/l5_ground.png');
    this.load.image('houses', 'assets/png/2/layers/l6_houses.png');
    this.load.image('ground', 'assets/platform.png');

    this.load.image('blackness', 'assets/png/2/blackness.png');
    this.load.image('sky', 'assets/png/2/layers/l1_background.png');
    this.load.image('hills', 'assets/png/2/layers/l2_hills.png');
    this.load.image('clouds', 'assets/png/2/layers/l3_clouds.png');
    this.load.image(
      'zombiemale',
      'assets/zombies-sprite/zombie-male/male-idle/idle01.png'
    );
    this.load.image('ruin', 'assets/png/2/layers/l4_ruin.png');
    this.load.image('ground', 'assets/png/2/layers/l5_ground.png');
    this.load.image('houses', 'assets/png/2/layers/l6_houses.png');
    this.load.image('ground', 'assets/platform.png');

    // Load Objects
    this.load.image('Crate', 'assets/grave-tiles/png/Objects/Crate.png');
    this.load.image('fireball', 'assets/fireball.png');
    this.load.image('nuclear', 'assets/nuclear_bomb1.png');
    this.load.image(
      'Skeleton',
      'assets/grave-tiles/png/Objects/Skeleton.png'
    );
    this.load.image(
      'dumpster',
      'assets/grave-tiles/png/Objects/dumpster.png'
    );
    this.load.image(
      'trashcan',
      'assets/grave-tiles/png/Objects/trashcan.png'
    );
    this.load.image(
      'zombie-group',
      'assets/grave-tiles/png/Objects/zombie-group.png'
    );
    this.load.image('platform', 'assets/platform.png');
    this.load.image('tile-platform', 'assets/tileplatform.png');

    // Load Sprite Data
    this.load.multiatlas('hero', 'assets/hero.json', 'assets');
    this.load.multiatlas('male', 'assets/male.json', 'assets');
    this.load.multiatlas('female', 'assets/female.json', 'assets');

    // Load Music
    this.load.audio('zombie-dance', [
      'assets/audio/zombie-dance.mp3',
      'assets/audio/zombie-dance.ogg',
    ]);

    // Load Zombie Noises
    this.load.audio('male-noise-1', [
      'assets/audio/noises/male-noise-1.mp3',
      'assets/audio/noises/male-noise-1.ogg',
    ]);
    this.load.audio('male-noise-2', [
      'assets/audio/noises/male-noise-2.mp3',
      'assets/audio/noises/male-noise-2.ogg',
    ]);
    this.load.audio('male-noise-3', [
      'assets/audio/noises/male-noise-3.mp3',
      'assets/audio/noises/male-noise-3.ogg',
    ]);
    this.load.audio('male-noise-4', [
      'assets/audio/noises/male-noise-4.mp3',
      'assets/audio/noises/male-noise-4.ogg',
    ]);
    this.load.audio('male-noise-5', [
      'assets/audio/noises/male-noise-5.mp3',
      'assets/audio/noises/male-noise-5.ogg',
    ]);
    this.load.audio('male-noise-6', [
      'assets/audio/noises/male-noise-6.mp3',
      'assets/audio/noises/male-noise-6.ogg',
    ]);
    this.load.audio('male-noise-7', [
      'assets/audio/noises/male-noise-7.mp3',
      'assets/audio/noises/male-noise-7.ogg',
    ]);
    this.load.audio('female-noise-1', [
      'assets/audio/noises/female-noise-1.mp3',
      'assets/audio/noises/female-noise-1.ogg',
    ]);
    this.load.audio('female-noise-2', [
      'assets/audio/noises/female-noise-2.mp3',
      'assets/audio/noises/female-noise-2.ogg',
    ]);
    this.load.audio('female-noise-3', [
      'assets/audio/noises/female-noise-3.mp3',
      'assets/audio/noises/female-noise-3.ogg',
    ]);
    this.load.audio('female-noise-4', [
      'assets/audio/noises/female-noise-4.mp3',
      'assets/audio/noises/female-noise-4.ogg',
    ]);
    this.load.audio('female-noise-5', [
      'assets/audio/noises/female-noise-5.mp3',
      'assets/audio/noises/female-noise-5.ogg',
    ]);
    this.load.audio('female-noise-6', [
      'assets/audio/noises/female-noise-6.mp3',
      'assets/audio/noises/female-noise-6.ogg',
    ]);
    this.load.audio('female-noise-7', [
      'assets/audio/noises/female-noise-7.mp3',
      'assets/audio/noises/female-noise-7.ogg',
    ]);

    // Load Gameplay Noises
    this.load.audio('squish', [
      'assets/audio/noises/squish.mp3',
      'assets/audio/noises/squish.ogg',
    ]);
    this.load.audio('bonk-1', [
      'assets/audio/noises/bonk-1.mp3',
      'assets/audio/noises/bonk-1.ogg',
    ]);
    this.load.audio('bonk-2', [
      'assets/audio/noises/bonk-2.mp3',
      'assets/audio/noises/bonk-2.ogg',
    ]);
    this.load.audio('bonk-3', [
      'assets/audio/noises/bonk-3.mp3',
      'assets/audio/noises/bonk-3.ogg',
    ]);
    this.load.audio('bonk-4', [
      'assets/audio/noises/bonk-4.mp3',
      'assets/audio/noises/bonk-4.ogg',
    ]);
    this.load.audio('bonk-5', [
      'assets/audio/noises/bonk-5.mp3',
      'assets/audio/noises/bonk-5.ogg',
    ]);
    this.load.audio('male-dead', [
      'assets/audio/noises/male-dead.mp3',
      'assets/audio/noises/male-dead.ogg',
    ]);
    this.load.audio('female-dead', [
      'assets/audio/noises/female-dead.mp3',
      'assets/audio/noises/female-dead.ogg',
    ]);
    this.load.audio('boom', [
      'assets/audio/boom.mp3',
      'assets/audio/boom.ogg',
    ]);
    this.load.audio("chime", [
      "assets/audio/chime.mp3",
      "assets/audio/chime.ogg",
    ]);
    this.load.audio("victory", [
      "assets/audio/victory.mp3",
      "assets/audio/victory.ogg",
    ]);
    this.load.audio("game-over-song", [
      "assets/audio/gameOverSong.mp3",
      "assets/audio/gameOverSong.ogg",
    ]);

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
//    let width = this.cameras.main.width;
//    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: 750,
      y: 250,
      text: "It's fine.....everything is fine...it's on fire....but it's fine",
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    let percentText = this.make.text({
      x: 710,
      y: 285,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    let assetText = this.make.text({
      x: 600,
      y: 350,
      text: '',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(560, 270, 320, 50);

    for (let i = 0; i < 700; i++) {
      this.load.image("don't worry about it " + i, 'assets/MOTMTLogo.png');
    }

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(570, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading: ' + file.key);
    });

    this.load.on('complete', function (complete) {
      assetText.destroy();
      percentText.destroy();
      progressBar.destroy();
      progressBox.destroy();
    });
  }

  function create() {
    // Add Background

    this.add.image(700, 300, 'sky');
    this.add.image(700, 700, 'hills');
    this.add.image(700, 300, 'clouds');
    this.add.image(700, 300, 'ruin');
    this.add.image(550, 290, 'zombiemale');
    this.add.image(700, 175, 'houses');

    // Add Music
    if (gameState.musicPlaying === false) {
      this.backgroundMusic = this.sound.add('zombie-dance', {
        volume: 0.8,
        loop: true,
      });
      gameState.globalMusic = this.backgroundMusic;
      this.backgroundMusic.play();
      gameState.musicPlaying = true;
    } else {
    }
    this.noise1 = this.sound.add('male-noise-1', {
      volume: 1.5,
      loop: false,
    });

    // Add Zombie Noises
    this.noise2 = this.sound.add('male-noise-2', {
      volume: 1.5,
      loop: false,
    });
    this.noise3 = this.sound.add('male-noise-3', {
      volume: 1.5,
      loop: false,
    });
    this.noise4 = this.sound.add('male-noise-4', {
      volume: 1.5,
      loop: false,
    });
    this.noise5 = this.sound.add('male-noise-5', {
      volume: 1.5,
      loop: false,
    });
    this.noise6 = this.sound.add('male-noise-6', {
      volume: 1.5,
      loop: false,
    });
    this.noise7 = this.sound.add('male-noise-7', {
      volume: 1.5,
      loop: false,
    });
    this.noise8 = this.sound.add('female-noise-1', {
      volume: 1.5,
      loop: false,
    });
    this.noise9 = this.sound.add('female-noise-2', {
      volume: 1.5,
      loop: false,
    });

    // Add Gameplay Noises
    this.squish = this.sound.add('squish', {
      volume: 0.3,
      loop: false,
    });
    this.bonk1 = this.sound.add('bonk-1', {
      volume: 0.3,
      loop: false,
    });
    this.bonk2 = this.sound.add('bonk-2', {
      volume: 0.3,
      loop: false,
    });
    this.bonk3 = this.sound.add('bonk-3', {
      volume: 0.3,
      loop: false,
    });
    this.bonk4 = this.sound.add('bonk-4', {
      volume: 0.3,
      loop: false,
    });
    this.bonk5 = this.sound.add('bonk-5', {
      volume: 0.3,
      loop: false,
    });
    this.maleDead = this.sound.add('male-dead', {
      volume: 0.8,
      loop: false,
    });
    this.femaleDead = this.sound.add('female-dead', {
      volume: 0.1,
      loop: false,
    });
    this.boom = this.sound.add('boom', {
      volume: 1,
      loop: false,
    });
    this.chime = this.sound.add("chime", {
      volume: 1,
      loop: false,
    });
    this.victory = this.sound.add("victory", {
      volume: 1,
      loop: false,
    });
    this.gameOverSong = this.sound.add("game-over-song", {
      volume: 1,
      loop: false,
    })

    // creating timer
    this.initialTime = 60;
    text = this.add.text(
      32,
      32,
      'Countdown: ' + formatTime(this.initialTime),
      {
        fontSize: '36px',
        stroke: '#000000',
        strokeThickness: '4',
      }
    );

    timedEvent = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      loop: true,
    });

    // Add Physics to Platforms and Objects
    platforms = this.physics.add.staticGroup();
    objects = this.physics.add.staticGroup();
    crates = this.physics.add.staticGroup();
    powerup = this.physics.add.staticGroup();

    //add powerups to game
    // let totalPositions = nukePositions.length;
    // function getRandom(min, max) {
    //   return Math.random() * (max - min) + min;
    // }
    // let whichNuke = Math.floor(getRandom(0, totalPositions));
    let whichNuke = arrayRandomizer(0, nukePositions.length);    
    powerup
      .create(
        nukePositions[whichNuke].x,
        nukePositions[whichNuke].y,
        'nuclear'
      )
      .setScale(1)
      .refreshBody();

    //add objects to game page
    objects.create(750, 520, 'dumpster').setScale(0.2).refreshBody();
    objects.create(1432, 560, 'trashcan').setScale(0.05).refreshBody();
    objects.create(300, 580, 'Skeleton').setScale(0.75).refreshBody();

    //add crates for player to jump on
    crates.create(415, 560, 'Crate').setScale(0.7).refreshBody();
    crates.create(485, 560, 'Crate').setScale(0.7).refreshBody();
    crates.create(450, 400, 'Crate').setScale(0.7).refreshBody();
    crates.create(1030, 560, 'Crate').setScale(0.7).refreshBody();
    crates.create(1100, 560, 'Crate').setScale(0.7).refreshBody();

    //Add 'platforms' to page
    // "Floor"       
    platforms.create(1500, 600, 'platform').setScale(10, 0.2).refreshBody();
    // Upper Left Platform
    platforms.create(150, 200, 'tile-platform').setScale(1).refreshBody();
    // Upper Right Platform
    platforms.create(1500, 200, 'tile-platform').setScale(1).refreshBody();
    // Upper Middle Platform
    platforms.create(750, 100, 'tile-platform').setScale(0.5).refreshBody();
    // Lower Right Platform
    platforms.create(1350, 450, 'tile-platform').setScale(1).refreshBody();
    // Middle Platform
    platforms
      .create(750, 300, 'tile-platform')
      .setScale(0.85)
      .refreshBody();

    // Reduce extra bounding box under the platforms (there's got to be a cleaner way to do this...)
    // Upper left
    platforms.children.entries[1].body.setSize(
      platforms.children.entries[1].width,
      40,
      true
    );

    // Upper right
    platforms.children.entries[2].body.setSize(
      platforms.children.entries[2].width,
      40,
      true
    );

    // Upper middle - note that width is multiplied by .5, as the platform is scaled by .5
    platforms.children.entries[3].body.setSize(
      platforms.children.entries[3].width * 0.5,
      40,
      true
    );

    // Lower right
    platforms.children.entries[4].body.setSize(
      platforms.children.entries[4].width,
      40,
      true
    );

    // Center - note that width is multiplied by .85, as the platform is scaled by .85
    platforms.children.entries[5].body.setSize(
      platforms.children.entries[5].width * 0.85,
      40,
      true
    );

    // Add 'Remaining Lives' to Screen
    this.add.text(50, 175, `Lives: ${gameState.remainingLives}`, {
      fontSize: '30px',
      fill: '#FFFFFF',
    });

    // Add 'Level' to Screen
    this.add.text(50, 140, `Level: ${gameState.level}`, {
      fontSize: '30px',
      fill: '#FFFFFF',
    });

    // Add 'player' sprite to scene
    player = this.physics.add.sprite(200, 400, 'hero', 'idle/idle01.png');
    player.setScale(0.2);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(250, 400, true);
    player.body.offset.x = 250;
    player.body.offset.y = 100;

    // 'player-idle' animation
    let idleFrameNames = this.anims.generateFrameNames('hero', {
      start: 1,
      end: 10,
      zeroPad: 2,
      prefix: 'idle/idle',
      suffix: '.png',
    });
    this.anims.create({
      key: 'player-idle',
      frames: idleFrameNames,
      frameRate: 10,
      repeat: -1,
    });
    player.anims.play('player-idle');

    // 'player-run' animation
    let runFrameNames = this.anims.generateFrameNames('hero', {
      start: 1,
      end: 10,
      zeroPad: 2,
      prefix: 'run/run',
      suffix: '.png',
    });
    this.anims.create({
      key: 'player-run',
      frames: runFrameNames,
      frameRate: 10,
      repeat: -1,
    });

    // 'player-jump' animation
    let jumpFrameNames = this.anims.generateFrameNames('hero', {
      start: 1,
      end: 12,
      zeroPad: 2,
      prefix: 'jump/jump',
      suffix: '.png',
    });

    this.anims.create({
      key: 'player-jump',
      frames: jumpFrameNames,
      frameRate: 6,
      repeat: 0,
    });

    // 'player-dead' animation
    let deadFrameNames = this.anims.generateFrameNames('hero', {
      start: 1,
      end: 10,
      zeroPad: 2,
      prefix: 'dead/dead',
      suffix: '.png',
    });

    this.anims.create({
      key: 'player-dead',
      frames: deadFrameNames,
      frameRate: 12,
      repeat: 0,
    });

    // 'male-idle' zombie animation
    let idleMaleFrameNames = this.anims.generateFrameNames('male', {
      start: 1,
      end: 15,
      zeroPad: 2,
      prefix: 'male-idle/idle',
      suffix: '.png',
    });
    this.anims.create({
      key: 'male-idle',
      frames: idleMaleFrameNames,
      frameRate: 10,
      repeat: -1,
    });

    // 'male-walk' zombie animation
    let maleWalkFrameNames = this.anims.generateFrameNames('male', {
      start: 1,
      end: 10,
      zeroPad: 2,
      prefix: 'male-walk/walk',
      suffix: '.png',
    });
    this.anims.create({
      key: 'male-walk',
      frames: maleWalkFrameNames,
      frameRate: 10,
      repeat: -1,
    });

    // 'male-dead' zombie animation
    let deadMaleFrameNames = this.anims.generateFrameNames('male', {
      start: 1,
      end: 12,
      zeroPad: 2,
      prefix: 'male-dead/dead',
      suffix: '.png',
    });
    this.anims.create({
      key: 'male-dead',
      frames: deadMaleFrameNames,
      frameRate: 10,
      repeat: 0,
    });

    // 'female-walk' zombie animation
    let femaleWalkFrameNames = this.anims.generateFrameNames('female', {
      start: 1,
      end: 10,
      zeroPad: 2,
      prefix: 'female-walk/walk',
      suffix: '.png',
    });
    this.anims.create({
      key: 'female-walk',
      frames: femaleWalkFrameNames,
      frameRate: 10,
      repeat: -1,
    });

    // 'female-dead' zombie animation
    let deadFemaleFrameNames = this.anims.generateFrameNames('female', {
      start: 1,
      end: 12,
      zeroPad: 2,
      prefix: 'female-dead/dead',
      suffix: '.png',
    });
    this.anims.create({
      key: 'female-dead',
      frames: deadFemaleFrameNames,
      frameRate: 10,
      repeat: 0,
    });

    // Physics for Player / Environment Interaction
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, crates);

    // Put Keyboard Input into Game State
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // Add zombie group
    const zombies = this.physics.add.group();

    function zombieGen() {
      if (gameState.play) {

        // Random Zombie
        let zombieNumber = arrayRandomizer(0, zombieSources.length);
        const zombieSource = zombieSources[zombieNumber];

        // Set Zombie Direction
        let zombieFlip = zombieSource.flip;
        let startX = zombieSource.startX;
        let startY = zombieSource.startY;
        let zombieVelocity = zombieSource.velocity;
        let xOffset = 100;
        let yOffset = 150;

        // Select Zombie Gender and Adjust Offset
        let zombieGender = 'male';
        let genderNum = arrayRandomizer(0, 2);
        if (genderNum === 0) {
          zombieGender = 'female';
          xOffset = 200;
          yOffset = 200;
          if (zombieFlip === true) {
            xOffset = 125;
          }
        }

        // Create Zombie from Sprite Sheet
        let thisZombie = zombies.create(
          startX,
          startY,
          `${zombieGender}`,
          `${zombieGender}-idle/idle01.png`
        );

        // Sprite Settings (Size, Orientation, Bounding Box, Direction, Physics)
        thisZombie.setScale(0.2);
        thisZombie.setBounce(0.2);
        thisZombie.flipX = zombieFlip;
        thisZombie.body.setSize(190, 370, true);
        thisZombie.body.offset.x = xOffset;
        thisZombie.body.offset.y = yOffset;
        thisZombie.anims.play(`${zombieGender}-walk`);
        thisZombie.setVelocityX(zombieVelocity);
        this.physics.add.collider(thisZombie, platforms);

        // Track How Many Zombies Have Been Created
        gameState.zombiesCreated += 1;

        // Play Random Zombie Noise for Every Few Zombies Created
        let theNum = arrayRandomizer(2, 7);
        // let theNum = Math.floor(getRandom(2, 7));
        this.randomNoise = this.sound.add(
          `${zombieGender}-noise-${theNum}`,
          {
            volume: 0.3,
            loop: false,
          }
        );
        if (gameState.zombiesCreated % 4 === 0) {
          this.randomNoise.play();
        }
      }
    }

    // Establish Zombie Creation Rate
    const zombieGenLoop = this.time.addEvent({
      delay: gameState.delay / gameState.level,
      callback: zombieGen,
      callbackScope: this,
      loop: true,
    });

    // Generate Fireballs
    const fireballs = this.physics.add.group();

    function fireballsGen() {
      switch (gameState.level) {
        case 1:
          gameState.fireballCreation = 10000;
          break;
        case 2:
          gameState.fireballCreation = 8000;
          break;
        case 3:
          gameState.fireballCreation = 6000;
          break;
        case 4:
          gameState.fireballCreation = 4000;
          break;
        case 5:
          gameState.fireballCreation = 2000;
          break;
        default:
          gameState.fireballCreation = 1000;
      }
      if (gameState.play) {
        // Set Random Fireball Source Location, Size
        let fireballX = Phaser.Math.Between(0, 1500);
        let thisFireball = fireballs.create(fireballX, -100, 'fireball');
        thisFireball.setScale(0.05);

        // Adjust Fireball Bounding Box
        thisFireball.body.setCircle(300);
        thisFireball.body.offset.y = 1800;
        thisFireball.body.offset.x = 350;
      }
    }
    const fireBallGenLoop = this.time.addEvent({
      // Adjust Rate of Fireball Creation
      // delay: gameState.delay*4,
      delay: gameState.fireballCreation,
      callback: fireballsGen,
      callbackScope: this,
      loop: true,
    });

    // Player Hits Zombie
    this.physics.add.collider(player, zombies, () => {
      if (
        // If Player Steps on Zombie, Nothing Happens
        player.body.touching.right === false &&
        player.body.touching.left === false &&
        player.body.touching.up === false
      ) {
      } else {
        // Else Player Dies
        this.squish.play();
        this.playerHit();
      }
    });

    // Fireball Hits Player
    this.physics.add.collider(player, fireballs, (player, fireball) => {
      this.bonk2.play();
      fireball.destroy();
      this.playerHit();
    });

    // Fireball Hits Zombie
    this.physics.add.collider(zombies, fireballs, (zombie, fireball) => {
      fireball.destroy();
      this.killZombie(zombie);
    });

    const pickupNuke = (player, nuclear) => {
      this.chime.play();
      gameState.nukes = gameState.nukes + 1;
      //hide powerup when hit by player
      powerup.killAndHide(nuclear);
      //disable the body
      nuclear.body.enable = false;
    };

    gameState.nukeBoom = () => {
      if (gameState.nukes > 0) {
        gameState.nukes = gameState.nukes - 1;
        // From: https://freesound.org/people/Iwiploppenisse/sounds/156031/
        this.boom.play();
        this.cameras.main.shake(1000, 0.02);

        //clear all zombies from game
        zombies.children.entries.forEach((zombie) =>
          this.killZombie(zombie)
        );
      }
    };

    this.physics.add.overlap(player, powerup, pickupNuke);

    // Reusable Function for Zombie Death
    this.killZombie = function (zombie) {
      zombie.setVelocityX(0);

      // Male Zombie Dies
      if (zombie.texture.key === 'male') {
        this.bonk2.play();
        this.maleDead.play();
        // Find out how to remove collider so it's no longer dangerous
        zombie.anims.play('male-dead', true);
        zombie.once('animationcomplete', () => {
          zombie.destroy();
        });
      } else {
        // Female Zombie Dies
        // Find out how to remove collider so it's no longer dangerous
        this.bonk3.play();
        this.femaleDead.play();
        zombie.anims.play('female-dead', true);
        zombie.once('animationcomplete', () => {
          zombie.destroy();
        });
      }
    };

    // Player killed
    this.playerHit = function () {
      // Scene Fades
      this.add.image(700, 300, 'blackness').setAlpha(0.4);

      // Game Stops
      gameState.play = false;
      this.backgroundMusic.stop();
      gameState.musicPlaying = false;
      this.noise1.play();
      this.physics.pause();

      // Determine if Game Over
      if (gameState.remainingLives === 0) {
        this.gameOverSong.play();
        this.add.text(490, 180, "Game Over", {
          fontSize: "100px",
          fill: "#FFFFFF",
        });
        this.add.text(510, 300, "Click to Restart", {
          fontSize: "50px",
          fill: "#FFFFFF",
        });

        // Restart Game on Click
        this.input.on('pointerup', () => {
          gameState.play = true;
          gameState.deadAnimationPlayed = false;
          gameState.remainingLives = 2;
          gameState.level = 1;
          gameState.nukes = 0;
          this.scene.restart();
        });
      } else {
        // Continue Game on Click
        this.add.text(600, 250, 'Click to Continue', {
          fontSize: '30px',
          fill: '#FFFFFF',
        });

        // Restart Game
        gameState.remainingLives -= 1;
        this.input.on('pointerup', () => {
          gameState.play = true;
          gameState.deadAnimationPlayed = false;
          gameState.nukes = 0;
          this.scene.restart();
        });
      }
    };
  }

  function update() {
    // Control Player Movement
    if (gameState.play) {
      // Player Moves Left
      if (gameState.cursors.left.isDown) {
        player.setVelocityX(-160);
        player.flipX = true;
        if (player.body.touching.down) {
          player.anims.play('player-run', true);
        } else {
          player.anims.play('player-jump', true);
        }

        // Player Moves Right
      } else if (gameState.cursors.right.isDown) {
        player.setVelocityX(160);
        player.flipX = false;
        if (player.body.touching.down) {
          player.anims.play('player-run', true);
        } else {
          player.anims.play('player-jump', true);
        }

        // Player in Midair
      } else if (!player.body.touching.down) {
        player.anims.play('player-jump', true);

        // Player Idle
      } else {
        player.setVelocityX(0);
        player.anims.play('player-idle', true);
        player.flipX = false;
      }

      // Player Jumps
      if (
        (gameState.cursors.up.isDown || gameState.cursors.space.isDown) &&
        player.body.touching.down
      ) {
        player.anims.play('player-jump', true);
        player.setVelocityY(-330);
      } else if (gameState.cursors.shift.isDown) {
        gameState.nukeBoom();
      }

      // Player Dead
    } else {
      if (gameState.deadAnimationPlayed === false) {
        gameState.deadAnimationPlayed = true;
        player.anims.play('player-dead', true);

        // Replace line below with a real tween
        //player.y = 550;
      }
    }
  }


  function formatTime(number) {
    number--;
    return number;
  }

  function onEvent() {
    //Logic to end game once timer ends
    if (this.initialTime === 1) {
      gameState.globalMusic.stop();
      gameState.musicPlaying = false;
      this.physics.pause();
      if (gameState.timesUp === false) {
        this.victory.play();
        gameState.timesUp = true;
        this.add.text(530, 175, 'Congrats, you made it out alive!', {
          fontSize: '30px',
          fill: '#FFFFFF',
        });

        this.input.on('pointerup', () => {
          gameState.play = true;
          gameState.deadAnimationPlayed = false;
          gameState.timesUp = false;
          gameState.nukes = 0;
          this.scene.restart();
        });
        gameState.level = gameState.level + 1;
        this.add.text(635, 280, `Click for Level ${gameState.level}`, {
          fontSize: '25px',
          fill: '#FFFFFF',
        });
      }
    } else if (gameState.play) {
      this.initialTime--;
      text.setText('Countdown: ' + formatTime(this.initialTime));
    }
  }
