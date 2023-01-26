const User = require("../../models/user");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports.verifyToken = async (req, res) => {
  try {
    const { bearerToken } = req.body;

    const tokenDecode = jwt.verify(bearerToken, process.env.SECRET_KEY);
    const user = await User.findById(
      new mongoose.Types.ObjectId(tokenDecode.user_id)
    );

    return res.status(200).json({ message: "success", user });
  } catch (error) {
    return res.status(401).json({ message: "error", error });
  }
};
