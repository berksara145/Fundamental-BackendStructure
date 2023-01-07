const mongoose = require("mongoose");
const env = require('dotenv')
env.config();
mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));