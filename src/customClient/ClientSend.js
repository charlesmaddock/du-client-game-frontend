const Client = require("./Client");
const messageTypes = require("./messageTypes");

module.exports = class ClientSend {
  static joinGame(socket, username, classType) {
    // Send test messages
    let joinPayload = JSON.stringify({
      type: messageTypes.fromClient.join,
      username: username,
      class: classType,
    });
    socket.send(joinPayload);
  }

  static fireBullet(client = Client, directionX, directionY) {
    let bulletPayload = JSON.stringify({
      type: messageTypes.fromClient.fireBullet,
      directionX: directionX,
      directionY: directionY,
    });
    client.webSocket.send(bulletPayload);
  }

  static updateMoveDirection(client = Client, directionX, directionY) {
    let movePayload = JSON.stringify({
      type: messageTypes.fromClient.updateDirection,
      x: directionX,
      y: directionY,
    });
    client.webSocket.send(movePayload);
  }
};
