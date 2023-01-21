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
  //checking if there is a server side error
  try {
    //if there is no id in the body object returns bad request
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "bad request",
      });
    }
    //checking whether surah exist

    //getting related surah, if it is not exist it gives error
    const surah = await surahDB.findById(mongoose.Types.ObjectId(id));
    if (!surah) {
      return res.status(404).json({
        message: "surah does not found",
      });
    }
    //getting the user
    const user = req.user;
    //if users saved surah paramter is empty
    if (user.savedSurah.length === 0) {
      //new array
      const savedSurah = [];
      savedSurah.push(mongoose.Types.ObjectId(surah._id));
      //saving it to the related users saved surah parameter
      user.savedSurah = savedSurah;
      //saving it to the database
      await user.save();
      return res.status(200).json({
        message: "successfully added to saved list",
      });
    }
    //if saved surah is not empty
    else {
      const savedSurahs = user.savedSurah;

      let isSurahExist = savedSurahs.includes(mongoose.Types.ObjectId(id));

      if (isSurahExist) {
        //if surah already exists remove it
        savedSurahs.splice(index, 1);
        user.savedSurah = savedSurahs;
        //saving to database
        await user.save();
        res.status(200).json({
          message: "successfully removed from saved list",
        });
      } else {
        //if surah does not exist, push it to the user's saved surah parameter
        savedSurahs.push(mongoose.Types.ObjectId(surah._id));
        user.savedSurah = savedSurahs;
        //saving to database
        await user.save();
        res.status(200).json({
          message: "successfully added to saved list",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
