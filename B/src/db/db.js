const { default: mongoose } = require("mongoose");

async function ConnectToDB() {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => console.error("Database Error : ", err));
  } catch (error) {}
}

module.exports = ConnectToDB;
