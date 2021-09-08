import gameState from './gameState.js';

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
      let thisFireball = gameState.fireballs.create(fireballX, -100, 'fireball');
      thisFireball.setScale(0.05);

      // Adjust Fireball Bounding Box
      thisFireball.body.setCircle(300);
      thisFireball.body.offset.y = 1800;
      thisFireball.body.offset.x = 350;
    }
  }

  export default fireballsGen;