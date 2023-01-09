const { Router } = require("express");
const User = require("../Database/Schemas/User");
const nodeMailer = require("nodemailer");
const { hashPassword, comparePassword } = require("../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const router = Router();
dotenv.config();

router.post("/login", login);

router.post("/register", register);

router.post("/forgotPassword", forgotPassword);

router.post("/checkForgetPasswordCode", checkForgetPassword);

router.post("/validateToken", verifyToken);

module.exports = router;
