let Vector2 = require("./Vector2");

module.exports = class Player {
  constructor() {
    this.username = "";
    this.name = "player";
    this.rotationDegrees = 0;
    this.position = new Vector2();
    this.movement = new Vector2();
  }

  update() {
    this.position += this.movement.normalized();
  }

  updateMovement(x, y) {
    movement.x = x;
    movement.y = y;
  }

  onPlayerDeath(client) {}

  spawnPlayer(client, x, y) {}

  displayInfo() {
    return `(${this.name} : ${this.id} : ${this.username})`;
  }
};
