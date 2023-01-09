const User = require("../../models/user");

const dotenv = require("dotenv");

dotenv.config();

module.exports.register = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({ message: "bad request" });
    }
    const userDB = await User.findOne({ email });
    if (userDB) {
      return response.status(400).json({ message: "User already exist!" });
    } else {
      const HashPassword = hashPassword(password);
      await User.create({ password: HashPassword, email });
      return response.status(201).json({
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "error",
      error: error,
    });
  }
};
