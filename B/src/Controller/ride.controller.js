const { validationResult } = require("express-validator");
const rideService = require("../service/ride.service");

async function createRide(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicletype } = req.body;

  try {
    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicletype,
    });

    return res.status(201).json({ ride });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function getfair(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createRide, getfair };
