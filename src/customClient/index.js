const WebSocket = require("ws");
const Client = require("./Client");
const ClientHandle = require("./ClientHandle");
const ClientSend = require("./ClientSend");
const config = require("../config");

const webSocket = new WebSocket("ws://localhost:52300");
console.log("Connecting...");
const client = new Client();

// You can remove USERNAMES and randomUsername in your own client
const USERNAMES = [
  "Maria",
  "Erik",
  "Anna",
  "Lars",
  "Margareta",
  "Karl",
  "Elisabeth",
  "Anders",
  "Eva",
  "Johan",
  "Kristina",
  "Per",
  "Birgitta",
  "Nils",
  "Karin",
  "Carl",
  "Marie",
  "Mikael",
  "Elisabet",
  "Jan",
  "Ingrid",
  "Hans",
];
const randomUsername =
  "Boten " +
  USERNAMES[Math.floor(Math.random() * USERNAMES.length)] +
  " " +
  Math.floor(Math.random() * 99);

// Start the update loop of the server, it will update all the players every x milliseconds
setInterval(() => {
  client.onUpdate();
}, 1000 / config.TICKS_PER_SECONDS);

webSocket.addEventListener("open", () => {
  // Store the new clients websocket
  client.webSocket = webSocket;

  let username = randomUsername; // Add you own username here
  let classType = Math.floor(Math.random() * 3); // 0 is machine gun, 1 is shotgun and 2 is cannon
  ClientSend.joinGame(webSocket, username, classType);
  console.log(
    `Your bot has connected to the server with the username '${username}' and is ready to fight!`
  );

  // Begin listening to all incoming messages from the server
  webSocket.on("message", (data) => {
    ClientHandle.handleMessage(data, client);
  });

  // If the server breaks the connection this will run
  webSocket.on("close", () => {
    console.log("Disconnected!");
    process.exit(0);
  });
});
