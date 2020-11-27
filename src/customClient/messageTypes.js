// Messages types version 1 (prototype)

// Messages sent from the server
const fromServer = {
  register: 0,
  spawnPlayer: 1,
  spawnBullet: 2,
  despawnPlayer: 3,
  despawnBullet: 4,
  position: 5,
  health: 6,
  error: 7,
  updatePosition: 8,
  updateDirection: 9,
  updateHealth: 10,
  updateHallOfFame: 11,
};

// Messages sent from the client
const fromClient = {
  join: 0, // Player requests to spawn. ex: "{"type": 0, "username": "name", "class": 0}"
  updateDirection: 1, // Player sends move direction. ex: "{"type": 1, "x": 0.82, "y": -0.47}"
  fireBullet: 2, // Fires a bullet in a given direction. ex: "{"type": 2, "directionX": 0.82, "directionY": -0.47}"
};

module.exports = { fromServer, fromClient };
