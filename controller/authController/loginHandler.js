const User = require("../../models/user");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const user = require("../../models/user");

dotenv.config();

module.exports.login = async (request, response) => {
  try {
    //getting the email and password from the request
    const { email, password, username } = await request.body;
    if ((!email && !username) || !password)
      return response.status(400).json({
        message: "bad request",
      });
    const searchFor = email ? email : username;
    //getting the related user in the database
    const userDB = await User.findOne({ searchFor });
    console.log(userDB);
    if (!userDB)
      return response.status(401).json({
        message: "error",
        error: {
          email: "Email does not exist",
        },
      });

    //comparing whether the password is true
    const isValid = comparePassword(password, userDB.password);
    if (isValid) {
      console.log("Authenticated Successfully!");
      const token = jwt.sign(
        {
          user_id: userDB._id,
          email: userDB.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1y", //TODO: expires in one day it can be change
        }
      );
      user.findOneAndUpdate({ email: email }, { bearerToken: token });
      return response.status(200).json({
        token,
        message: "success",
      });
    } else {
      console.log("Failed to Authenticate");
      return response.status(401).json({
        message: "error",
        error: {
          password: "Password is not correct!",
        },
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "error", error });
  }
};
