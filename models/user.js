const mongoose = require("mongoose");

const UserScheama = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bearerToken: {
    type: String,
  },
  forgotPassword: {
    code: {
      type: Number,
    },
    expireDate: {
      type: Date,
    },
  },

  resetToken: {
    type: String,
  },

  savedSurah: [mongoose.SchemaTypes.ObjectId],

  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", UserScheama);
