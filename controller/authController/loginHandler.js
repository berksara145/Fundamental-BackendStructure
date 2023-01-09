const User = require("../../models/user");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports.login = async (request, response) => {
  //getting the email and password from the request
  const { email, password } = await request.body;
  if (!email || !password) return response.status(400);

  //getting the related user in the database
  const userDB = await User.findOne({ email });
  if (!userDB) return response.status(401);

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
        expiresIn: "1d",
      }
    );
    return response.status(200).json({
      token,
      message: "success",
    });
  } else {
    console.log("Failed to Authenticate");
    return response.status(401).json({
      message: "error",
    });
  }
};
