module.exports = class Client {
  constructor() {
    this.id = "";
    this.class = "";
    this.health = Number(0);
  }

  // Handles incoming messages through the web socket
  createEvents(webSocket) {
    webSocket.on("message", (data) => {
      let jsonData = JSON.parse(data);
      if (jsonData.type) {
        console.log(`recv: ${data}`);
        switch (jsonData.type) {
          case "register":
            this.register(jsonData);
            break;
          case "movement":
            this.updateMovement(jsonData);
            break;
          case "rotation":
            this.updateRotation(jsonData);
            break;
          default:
            break;
        }
      }
    });

    webSocket.on("close", () => {
      this.server.onDisconnected(this);
    });
  }

  register(data) {
    console.log("register!");
    this.id = data.id;
  }

  updateMovement(data) {
    this.player.updateMovement(data.x, data.y);

    if (!this.isInsideArena(this.player, this.currentChunk)) {
      let newCurrentChunkId = this.findPlayersChunkId(this);
      if (newCurrentChunkId) {
        this.region.onSwitchChunk(this, newCurrentChunkId);
      }
    }

    let positionPayload = {
      id: player.id,
      x: data.x,
      y: data.y,
    };
    socket.broadcast.emit("update position", positionPayload);
  }

  updateRotation(data) {
    player.rotationDegrees = data.rotationDegrees;

    let rotationPayload = {
      id: player.id,
      bodyRotX: data.bodyRotX,
      bodyRotY: data.bodyRotY,
    };
    socket.broadcast.emit("update rotation", rotationPayload);
  }
};
