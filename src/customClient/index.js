const WebSocket = require("ws");
const Client = require("./Client");

const TICKS_PER_SECONDS = 38;
const webSocket = new WebSocket("ws://localhost:52300");
const client = new Client();

// Start the update loop of the server, it will update all the players every x milliseconds
setInterval(() => {
  onUpdate();
}, 60 / TICKS_PER_SECONDS);

webSocket.addEventListener("open", () => {
  client.createEvents(webSocket);

  let test = { type: 0, movementX: 0, movementY: 0 };
  webSocket.send(JSON.stringify(test));
});

const onUpdate = () => {};
