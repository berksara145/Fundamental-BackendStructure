const { Router } = require("express");
const { search } = require("../controller/surahController/searchController");
const { detail } = require("../controller/surahController/detailController");
const isAuth = require("../utils/isAuth");

const router = Router();

router.get("/search", isAuth, search);
router.get("/detail", isAuth, detail);

module.exports = router;
