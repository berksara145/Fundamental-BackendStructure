const { Router } = require("express");
const { home } = require("../controller/userController/homeController");

const router = Router();

router.get("/home", home);

module.exports = router;
