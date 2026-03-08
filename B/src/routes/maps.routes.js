const express = require("express");
const Auth = require("../middleware/auth.middleware");
const route = express.Router();
const mapController = require("../Controller/map.controller");

route.get("/get-coordinates", Auth.authenticaton, mapController.getCoordinates);

route.get(
  "/get-distance-time",
  Auth.authenticaton,
  mapController.getDistanceTime,
);

route.get("/suggestions", Auth.authenticaton, mapController.getSuggestions);

module.exports = route;
