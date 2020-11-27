let Vector2 = require("./Vector2");

module.exports = class Player {
  constructor(playerData, currentClient) {
    this.username = playerData.username;
    this.id = playerData.id;
    this.class = playerData.class;
    this.isMyPlayer = playerData.id === currentClient.id;

    this.position = new Vector2(playerData.posX, playerData.posY);
    this.direction = new Vector2(playerData.dirX, playerData.dirY);

    this.health = Number(playerData.health);
    this.kills = Number(playerData.kills);
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  setDirection(x, y) {
    this.direction.x = x;
    this.direction.y = y;
  }

  setHealth(health) {
    this.health = health;
  }

  displayInfo() {
    return `(${this.name} : ${this.id} : ${this.username})`;
  }
};
