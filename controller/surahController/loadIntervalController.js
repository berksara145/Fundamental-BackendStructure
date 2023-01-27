const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports.loadInterval = async (req, res) => {
  try {
    const jsonString = req.body.data;
    if (!jsonString) {
      return res.status(400).json({
        message: "bad request",
      });
    }
    const json = JSON.parse(jsonString);
    console.log(json);
    const surah_no = json.surah;
    const surah = await surahDB.findOne({ surah_no });
    if (!surah) {
      return res.status(404).json({
        message: "surah does not exist",
      });
    }
    const kari = json.kari;

    let soundObj;
    let counter = 0;
    surah.sounds.forEach((elmt) => {
      if (elmt.kari_name === kari) {
        soundObj = elmt;
        return;
      }
      counter++;
    });

    if (!soundObj) {
      return res.status(404).json({
        message: "kari does not exist",
      });
    }
    for (let i = 0; i < surah.details.length; i++) {
      const verseDB = surah.details[i].verse;
      const verseReq = json.details[i].verse;
      for (let j = 0; j < verseDB.length; j++) {
        if (verseDB[j] != verseReq[j]) {
          return res.status(409).json({
            message: "conflict between verse intervals",
          });
        }
      }
    }
    surah.sounds[counter].intervals = json.details;
    await surah.save();
    return res.status(200).json({
      message: "success",
    });
  } catch {
    return res.status(500).json({
      message: "server error",
    });
  }
};
