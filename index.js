const groceriesRoute = require("./routes/template");
const authRoute = require("./routes/auth");
const express = require("express");
const isAuth = require("./utils/isAuth");
const userRoute = require("./routes/user");
const env = require("dotenv");
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded());

env.config();

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.json({
    message: "Server acitvated",
  });
});

//login and register routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1", isAuth, groceriesRoute);
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(PORT, () => `Port :${process.env.PORT || PORT}`);
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));
