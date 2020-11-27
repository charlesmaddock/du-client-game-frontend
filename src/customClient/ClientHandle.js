const Client = require("./Client");
const messageTypes = require("./messageTypes");
const Player = require("./Player");
let Bullet = require("./Bullet");
const Vector2 = require("./Vector2");

////////////////////////////////////////////////////////////////////////////////
//                         HANDLE MESSAGE FROM SOCKET                         //
////////////////////////////////////////////////////////////////////////////////
const messageHandlers = {
  [messageTypes.fromServer.register]: register,
  [messageTypes.fromServer.spawnPlayer]: spawnPlayer,
  [messageTypes.fromServer.spawnBullet]: spawnBullet,
  [messageTypes.fromServer.despawnPlayer]: despawnPlayer,
  [messageTypes.fromServer.despawnBullet]: despawnBullet,
  [messageTypes.fromServer.error]: error,
  [messageTypes.fromServer.updatePosition]: updatePosition,
  [messageTypes.fromServer.updateDirection]: updateDirection,
  [messageTypes.fromServer.updateHealth]: updateHealth,
  [messageTypes.fromServer.updateHallOfFame]: updateHallOfFame,
};

function handleMessage(data, client) {
  try {
    // console.log(`Received:`);
    // console.log(jsonData);
    let jsonData = JSON.parse(data);
    messageHandlers[jsonData.type](jsonData, client);
  } catch (err) {
    printError(err, data);
  }
}

function printError(err, data) {
  let typeName = "undefined";
  for (const key in messageTypes.fromServer) {
    if (messageTypes.fromServer[key] === JSON.parse(data).type) {
      typeName = key;
    }
  }
  if (typeName === "undefined") {
    console.log(
      "A message with an undefined type has been sent. Did you forget to add a key value pair to messageHandlers?"
    );
  } else {
    console.log(`Error receiving message of type '${typeName}': ` + err);
  }
}

////////////////////////////////////////////////////////////////////////////////
//                        MESSAGE HANDLER FUNCTIONS                           //
////////////////////////////////////////////////////////////////////////////////
function register(jsonData, client) {
  client.id = jsonData.id;
}

function spawnPlayer(jsonData, client = Client) {
  let player = new Player(jsonData, client);
  client.players[player.id] = player;

  if (player.isMyPlayer === true) {
    client.myPlayer = player;
  }
}

function despawnPlayer(jsonData, client) {
  delete client.players[jsonData.id];
}

function spawnBullet(jsonData, client) {
  let bullet = new Bullet(jsonData);
  client.bullets[bullet.id] = bullet;
}

function despawnBullet(jsonData, client) {
  delete client.bullets[jsonData.id];
}

function error(jsonData, client) {
  console.log(jsonData.message);
}

function updatePosition(jsonData, client) {
  client.players[jsonData.id].setPosition(jsonData.x, jsonData.y);
}

function updateDirection(jsonData, client) {
  client.players[jsonData.id].setDirection(jsonData.x, jsonData.y);
}

function updateHealth(jsonData, client) {
  client.players[jsonData.id].setHealth(jsonData.health);
}

function updateHallOfFame(jsonData, client) {
  client.hallOfFame = jsonData.hallOfFame;
}

module.exports = { handleMessage };
