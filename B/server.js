require("dotenv").config();
const { createServer } = require("http");
const app = require("./src/app");
const ConnectToDB = require("./src/db/db");

const httpServer = createServer(app);

const port = process.env.PORT || 4000;

const initSocketServer = require("./src/service/Socket.service");

initSocketServer(httpServer);

ConnectToDB();

httpServer.listen(port, () => {
  console.log(`Server is now running on port ${port} ✅`);
});
