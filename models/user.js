const mongoose = require("mongoose");

const UserScheama = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  bearerToken: {
    type: mongoose.SchemaTypes.String,
  },
  forgotPassword: {
    code: {
      type: mongoose.SchemaTypes.Number,
    },
    expireDate: {
      type: mongoose.SchemaTypes.Date,
    },
  },

  resetToken: {
    type: mongoose.SchemaTypes.String,
  },

  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", UserScheama);
