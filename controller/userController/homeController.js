const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");
const dotenv = require("dotenv");
dotenv.config();

module.exports.home = async (req, res) => {
  try {
    const fatiha = await surahDB.find({
      surah_no: 1,
    });
    const surahs = await surahDB
      .find({}, { surah_no: 1, _id: 1, name: 1 })
      .limit(20);

    res.status(200).json({
      detailedSurah: fatiha[0],
      surahList: surahs,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
