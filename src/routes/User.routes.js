const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const userController = require(".././Controller/user.controller");

route.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userController.registerUser,
);

route.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userController.loginUser,
);

module.exports = route;
