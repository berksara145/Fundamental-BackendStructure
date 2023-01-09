const User = require("../../models/user");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports.checkForgetPassword = async (req, res) => {
  const { email, code } = await req.body;

  //checking whtether request is valid
  if (!email || !code) {
    return res.status(400).send({
      message: "bad request",
    });
  }
  //finding the user
  const userDB = await User.findOne({ email: email });
  if (!userDB) {
    return res.status(404).send({ message: "user does not exist" });
  }
  const codeDB = userDB.forgotPassword ? userDB.forgotPassword.code : undefined;
  if (!codeDB) {
    return res.status(404).json({ message: "no validation code" });
  }
  const expireDate = userDB.forgotPassword.expireDate;
  if (code === codeDB && new Date().getDate() <= expireDate.getDate()) {
    const resetToken = jwt.sign(
      {
        id: userDB._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    await User.findOneAndUpdate(
      {
        email,
      },
      {
        resetToken,
      }
    );
    return res.status(200).json({ message: "success", resetToken });
  } else {
    return res.status(401).json({
      message: "code is wrong",
    });
  }
};
