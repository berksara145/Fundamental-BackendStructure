const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");
const user = require("../../models/user");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports.edit = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username && !email) {
      return res.status(400).json({
        message: "bad request",
      });
    }
    const usernamedb = await user.findOne({ username });
    const emaildb = await user.findOne({ email });

    if (usernamedb && emaildb) {
      return res.status(403).json({
        error: "error",
        message: ["username", "email"],
      });
    } else if (emaildb) {
      return res.status(403).json({
        error: "error",
        message: ["email"],
      });
    } else if (usernamedb) {
      return res.status(403).json({
        error: "error",
        message: ["username"],
      });
    } else {
      if (email && !emaildb) {
        req.user.email = email;
      }
      if (username && !username) {
        req.user.username = username;
      }
      await req.user.save();
      return res.status(200).json({
        message: "success",
      });
    }
  } catch {
    return res.status(500).json({
      message: "server error",
    });
  }
};
