const { validationResult } = require("express-validator");
const CaptainModel = require("../models/Captain.model");

async function registerCaptain(req, res) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password, phone, vehicle } = req.body;

  const color = vehicle?.color;
  const plate = vehicle?.plate;
  const capacity = vehicle?.capacity;
  const vehicletype = vehicle?.vehicletype;

  console.log(fullname, email, password, phone, vehicle);

  if (
    !fullname?.firstname ||
    !fullname?.lastname ||
    !email ||
    !password ||
    !phone ||
    !color ||
    !plate ||
    !capacity ||
    !vehicletype
  ) {
    return res.status(400).json({
      message: "All fields are required",
      body: req.body,
    });
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
    phone,
    vehicle: {
      color,
      plate,
      capacity,
      vehicletype,
    },
  });

  const token = captain.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.status(201).json({
    captain,
  });
}

async function loginCaptian(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await CaptainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Account not exists" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credential" });
  }

  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({
    message: "Loggedin Successfully",
    token,
    captain,
  });
}

module.exports = { registerCaptain, loginCaptian };
