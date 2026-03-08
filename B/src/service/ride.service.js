const rideModel = require("../models/ride.model");
const { getDistanceTimefromAddress } = require("./maps.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function createRide({ userId, pickup, destination, vehicletype }) {
  // console.log(userId, pickup, destination, vehicletype);

  if (!userId || !pickup || !destination || !vehicletype) {
    throw Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    userId,
    pickup,
    destination,
    otp: generateOTP(6),
    fare: fare[vehicletype],
  });
  return ride;
}

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await getDistanceTimefromAddress(pickup, destination);

  const distanceInKm = distanceTime.distance_meters / 1000;
  const timeInMinutes = distanceTime.duration_seconds / 60;

  const baseFare = { auto: 30, car: 50, moto: 20 };
  const perkmRate = { auto: 12, car: 18, moto: 8 };
  const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceInKm * perkmRate.auto +
        timeInMinutes * perMinuteRate.auto,
    ),

    car: Math.round(
      baseFare.car +
        distanceInKm * perkmRate.car +
        timeInMinutes * perMinuteRate.car,
    ),

    moto: Math.round(
      baseFare.moto +
        distanceInKm * perkmRate.moto +
        timeInMinutes * perMinuteRate.moto,
    ),
  };

  return fare;
}

function generateOTP(num) {
  const min = 10 ** (num - 1);
  const max = 10 ** num - 1;

  const otp = crypto.randomInt(min, max + 1);

  return otp.toString();
}

module.exports = { generateOTP };

module.exports = { createRide, getFare };
