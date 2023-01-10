const { Router } = require("express");
const User = require("../models/user");
const nodeMailer = require("nodemailer");
const { hashPassword, comparePassword } = require("../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { login } = require("../controller/authController/loginHandler");
const { register } = require("../controller/authController/registerHandler");
const {
  forgotPassword,
} = require("../controller/authController/forgotPasswordHandler");
const {
  checkForgetPassword,
} = require("../controller/authController/checkForgetPasswordCodeHandler");
const {
  verifyToken,
} = require("../controller/authController/veryTokenHandler");
const {
  resetPassword,
} = require("../controller/authController/resetPasswordHandler");

const router = Router();
dotenv.config();

router.post("/login", login);

router.post("/register", register);

router.post("/forgotPassword", forgotPassword);

router.post("/checkForgetPasswordCode", checkForgetPassword);

router.post("/verifyToken", verifyToken);

router.post("/resetPassword", resetPassword);

module.exports = router;
