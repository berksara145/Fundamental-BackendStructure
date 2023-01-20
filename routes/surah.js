const { Router } = require("express");
const { search } = require("../controller/surahController/searchController");

router.get("/search", search);

module.exports = router;
