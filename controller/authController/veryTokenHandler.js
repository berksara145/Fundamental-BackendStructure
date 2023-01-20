const User = require("../../models/user");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports.verifyToken = async (req, res) => {
  try {
    const { bearerToken } = req.body;

    jwt.verify(bearerToken, process.env.SECRET_KEY);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(401).json({ message: "error", error });
  }
};
