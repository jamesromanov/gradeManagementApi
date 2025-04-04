const express = require("express");
const err = require("../utils/error");
const cookieParser = require("cookie-parser");
const authRouter = require("../routers/auth.router");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(err);

app.use("/auth", authRouter);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

module.exports = app;
