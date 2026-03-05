require("dotenv").config();
const app = require("./src/app");
const ConnectToDB = require("./src/db/db");
const port = process.env.port || 3000;

ConnectToDB();
app.listen(port, () => {
  console.log(`Server is now running on port ${port}✅`);
});
