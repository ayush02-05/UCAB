const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const DriverController = require("../Controller/Driver.controller");

route.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
    body("vehicle.plate").notEmpty().withMessage("Vehicle plate is required"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.vehicletype")
      .isIn(["motorcycle", "car", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  DriverController.registerCaptain,
);

route.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  DriverController.loginCaptian,
);

module.exports = route;
