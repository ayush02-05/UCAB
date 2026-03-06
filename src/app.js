const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User.routes");

// server creatd
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// api Connect
app.use("/api/user", userRoutes);

module.exports = app;
