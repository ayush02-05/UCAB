const { validationResult } = require("express-validator");
const UserModel = require("../models/User.model");
const blacklisttoken = require("../models/blacklist.model");

async function registerUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, confirmPassword } = req.body;

  const isExist = await UserModel.findOne({ email });

  if (isExist) {
    return res.status(409).json({ message: "Account already exists" });
  }

  const hashedPassword = await UserModel.hashPassword(password);

  const user = await UserModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(201).json({
    user,
  });
}

async function loginUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Account not exists" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credential" });
  }

  const token = await user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({
    message: "Loggedin Successfully",
    user,
  });
}

async function getProfile(req, res) {
  const id = req.user._id;
  if (!id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({
      message: "User Details Fetched",
      user,
    });
  } catch (error) {
    console.error("GetUserDetail Error:", error);
    return res.status(500).json({
      message: "Error while fetching user details",
      error: error.message,
    });
  }
}

async function logOut(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }
  await blacklisttoken.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "LogOut Successfully" });
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logOut,
};
