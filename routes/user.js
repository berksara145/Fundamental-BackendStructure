const { Router } = require("express");
const { home } = require("../controller/userController/homeController");
const { search } = require("../controller/userController/searchController");
const router = Router();

router.get("/home", home);
router.get("/search", search);

module.exports = router;
