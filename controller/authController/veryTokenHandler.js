const User = require("../../models/user");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports.verifyToken = async (req, res) => {
  try {
    const { bearerToken } = req.body;

    const tokenDecode = jwt.verify(bearerToken, process.env.SECRET_KEY);

    if (tokenDecode.exp < new Date().getTime()) {
      // expire olmasına 15dk kalmış, yine de expire olmuş diyelim hata çıkmasın
      return res.status(401).json({ message: "error", error: "Token expired" });
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(401).json({ message: "error", error });
  }
};
