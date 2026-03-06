const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

async function authenticaton(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: decoded._id });
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = { authenticaton };
