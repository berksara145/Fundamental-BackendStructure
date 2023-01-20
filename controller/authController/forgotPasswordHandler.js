const User = require("../../models/user");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

module.exports.forgotPassword = async (request, response) => {
  const { email } = request.body;
  const userDB = await User.findOne({ email });
  if (!email) {
    return response.status(400).json({
      message: "Bad Request",
    });
  }
  if (userDB) {
    //6-digit number generate
    const code = Math.floor(100000 + Math.random() * 900000);

    //determining expire date

    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 5);
    //forgotPassword object
    const forgotPassword = {
      code,
      expireDate,
    };

    userDB.forgotPassword = forgotPassword;
    await userDB.save();

    //sending email to the related user
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "emirkaan184@gmail.com",
        pass: process.env.HOST_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "emirkaan184@gmail.com",
      to: "merakserhat@gmail.com",
      subjects: "Password Reset",
      text: "Your verification code is " + code,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return response.status(200).json({
      msg: "success",
    });
  } else response.status(404).send({ msg: "User does not exist!" });
};
