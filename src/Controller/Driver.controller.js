const { validationResult } = require("express-validator");
const CaptainModel = require("../models/Captain.model");

async function registerCaptain(req, res) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password, vehicle } = req.body;
  const { color, plate, capacity, vehicletype } = vehicle;

  if (
    !fullname?.firstname ||
    !fullname?.lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicletype
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isExist = await CaptainModel.findOne({ email });

  if (isExist) {
    return res.status(409).json({ message: "Account already exists" });
  }

  const hashedPassword = await CaptainModel.hashPassword(password);

  const captain = await CaptainModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashedPassword,
    vehicle: {
      color,
      plate,
      capacity,
      vehicletype,
    },
  });

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({
    token,
    captain,
  });
}

module.exports = { registerCaptain };
