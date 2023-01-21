const { Router } = require("express");
const { home } = require("../controller/userController/homeController");
const { save } = require("../controller/userController/saveController");
const isAuth = require("../utils/isAuth");

const router = Router();

router.get("/home", isAuth, home);
router.post("/save", isAuth, save);

module.exports = router;
