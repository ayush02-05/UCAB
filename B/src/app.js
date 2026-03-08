const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/User.routes");
const captainRoutes = require("./routes/Driver.route");
const mapRoutes = require("./routes/maps.routes");

// server creatd
const app = express();

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// api Connect
app.use("/api/user", userRoutes);
app.use("/api/captain", captainRoutes);
app.use("/map", mapRoutes);

module.exports = app;
