const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");

module.exports.home = async (req, res) => {
  try {
    const fatiha = await surahDB.findById(
      mongoose.Types.ObjectId("63c9a2e0c9069c33916e247f")
    );
    const surahs = await surahDB.find(
      { surah_no: { $lte: 20 } },
      { surah_no: 1, _id: 1, name: 1 }
    );
    console.log(surahs);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
