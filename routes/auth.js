const { Router } = require("express");
const {
  checkForgetPassword,
} = require("../controller/authController/checkForgetPasswordCodeHandler");
const {
  forgotPassword,
} = require("../controller/authController/forgotPasswordHandler");

const { login } = require("../controller/authController/loginHandler");
const { register } = require("../controller/authController/registerHandler");
const {
  resetPassword,
} = require("../controller/authController/resetPasswordHandler");
const {
  verifyToken,
} = require("../controller/authController/veryTokenHandler");

const router = Router();

router.post("/checkForgetPasswordCode", checkForgetPassword);
router.post("/forgotPassword", forgotPassword);
router.post("/login", login);
router.post("/register", register);
router.post("/resetPassword", resetPassword);
router.post("/verifyToken", verifyToken);

module.exports = router;
