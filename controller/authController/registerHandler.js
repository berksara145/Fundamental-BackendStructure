const User = require("../../models/user");
const { hashPassword } = require("../../utils/hashing");
const dotenv = require("dotenv");

dotenv.config();

module.exports.register = async (request, response) => {
  try {
    const { email, password, username } = request.body;
    if (!email || !username) {
      return response.status(400).json({ message: "bad request" });
    }
    const userDB = await User.findOne({ email });
    if (userDB) {
      return response
        .status(400)
        .json({ message: "error", error: { email: "email already exists" } });
    } else {
      const HashPassword = hashPassword(password);
      await User.create({ password: HashPassword, email, username });
      return response.status(201).json({
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "server error",
    });
  }
};
