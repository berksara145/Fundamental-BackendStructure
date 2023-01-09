const { Router } = require("express");

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

const router = Router();
dotenv.config();

router.post("/login", login);

router.post("/register", register);

router.post("/forgotPassword", forgotPassword);

router.post("/checkForgetPasswordCode", checkForgetPassword);

router.post("/validateToken", verifyToken);

module.exports = router;
