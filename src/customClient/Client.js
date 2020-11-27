const ClientSend = require("./ClientSend");
const Vector2 = require("./Vector2");

// You can remove this when making your own client
const zigZagOffset = Number(Math.random() * 1000);

module.exports = class Client {
  constructor() {
    this.id = "";
    this.myPlayer = null;
    this.webSocket = null;

    this.players = {};
    this.bullets = {};
    this.hallOfFame = [];
  }

  // Updates about 38 times a second.
  // Here you may add code that makes your client react to it's surroundings and fight!
  onUpdate() {
    // Update all the bullets
    for (const bulletId in this.bullets) {
      this.bullets[bulletId].update();
    }

    // If our own player is in the game, begin hunting for the nearest player
    if (this.myPlayer !== null) {
      let nearestPlayer = null;
      let nearestDist = 1000;
      for (const playerId in this.players) {
        let player = this.players[playerId];
        if (player.isMyPlayer === false) {
          if (nearestPlayer === null) {
            nearestPlayer = player;
          } else if (
            player.position.distance(this.myPlayer.position) < nearestDist
          ) {
            nearestPlayer = player;
            nearestDist = player.position.distance(this.myPlayer.position);
          }
        }
      }

      // If we find a player that is close to us, go towards it in a zig zag motion
      // to avoid bullets. Aim and fire in their direction aswell.
      if (nearestPlayer !== null) {
        // A vector2 that points toward our enemy
        let direction = this.myPlayer.position
          .direction(nearestPlayer.position)
          .normalized();

        // Adds some random zig zag motion to our movement vector2
        let random = new Vector2(
          Math.sin((Number(new Date()) + zigZagOffset) / 1000),
          Math.cos((Number(new Date()) + zigZagOffset) / 1000)
        ).normalized();

        // Fire a bullet towards our enemy! Cool down in the server
        // will prevent us from shooting every tick however.
        ClientSend.fireBullet(this, direction.x, direction.y);

        // If we are close to the enemy, keep a distance and fire
        let dist = nearestPlayer.position.distance(this.myPlayer.position);
        let move = direction.add(random);
        if (dist < 40) {
          move = random.add(direction.multiply(0.5));
        }
        // Update the direction our bot is moving in.
        ClientSend.updateMoveDirection(this, move.x, move.y);
      }
    }
  }
};
