const { Router } = require("express");
const { search } = require("../controller/surahController/searchController");
const { detail } = require("../controller/surahController/detailController");
const {
  loadInterval,
} = require("../controller/surahController/loadIntervalController");
const isAuth = require("../utils/isAuth");

const router = Router();

router.get("/search", isAuth, search);
router.get("/detail", isAuth, detail);
router.post("/loadInterval", isAuth, loadInterval);

module.exports = router;
