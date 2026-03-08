const express = require("express");
const route = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../Controller/ride.controller");
const Auth = require("../middleware/auth.middleware");

route.post(
  "/create",
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Pickup"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination"),
    body("vehicletype")
      .isString()
      .isIn(["auto", "moto", "car"])
      .withMessage("Invalid vehicletype"),
  ],
  Auth.authenticaton,
  rideController.createRide,
);
route.get(
  "/getfair",
  [
    // 3. Change body() to query() since we send data in the URL
    query("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Pickup"),
    query("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination"),
  ],
  Auth.authenticaton,
  rideController.getfair,
);

module.exports = route;
