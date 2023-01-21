const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");
const userDB = require("../../models/user");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports.save = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "bad request",
      });
    }
    try {
      const surah = await surahDB.findById(mongoose.Types.ObjectId(id));
      const user = req.user;

      if (user.savedSurah.length == 0) {
        const savedSurah = [];
        savedSurah.push(mongoose.Types.ObjectId(surah._id));
        user.savedSurah = savedSurah;
        await user.save();
        return res.status(200).json({
          message: "successfully added to saved list",
        });
      } else {
        let index = 0;
        const savedSurahs = user.savedSurah;
        savedSurahs.forEach((surah) => {
          if (surah.toString() == id) {
            savedSurahs.splice(index, 1);
            user.savedSurah = savedSurahs;
            user.save();
            return res.status(200).json({
              message: "successfully deleted from saved list",
            });
          }
          index++;
        });
        savedSurahs.push(mongoose.Types.ObjectId(surah._id));
        user.savedSurah = savedSurahs;
        user.save();
        res.status(200).json({
          message: "successfully added to saved list",
        });
      }
    } catch {
      return res.status(404).json({
        message: "surah does not found",
      });
    }

    const user = req.user;
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
