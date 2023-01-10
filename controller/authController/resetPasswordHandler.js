const user = require("../../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { hashPassword } = require("../../utils/hashing");
const express = require("express");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
dotenv.config();
module.exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  if (!resetToken || !newPassword) {
    return res.status(400).json({
      message: "bad request",
    });
  }
  try {
    const verifyToken = jwt.verify(resetToken, process.env.SECRET_KEY);
    if (verifyToken.exp < new Date().getTime()) {
      const userDB = await user.findOne({ email: verifyToken.email });
      if (!userDB) {
        return res.status(404).json({
          message: "user does not exist",
        });
      } else {
        const cryptedPassword = hashPassword(newPassword);
        await user.findOneAndUpdate(
          { email: verifyToken.email },
          { password: cryptedPassword }
        );
        return res.status(200).json({ message: "success" });
      }
    } else {
      return res.status(401).json({
        message: "token expired",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "invalid token",
    });
  }
};
