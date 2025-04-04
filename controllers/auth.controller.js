const { response } = require("../utils/response");
const usersModel = require("../models/users.model");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const register = errorHandler(async (req, res, next) => {
  let { fullName, email, password, role, active } = req.body;
  if (!fullName) throw new Error("Please enter your fullname!");
  if (!email) throw new Error("Please enter your email!");
  if (!password) throw new Error("Please enter your password!");
  if (!role) throw new Error("Please enter your role!");
  let [emailChecking, fullNameChecking] = await Promise.all([
    await usersModel.find({ email }),
    await usersModel.find({ fullName }),
  ]);
  if (fullNameChecking.length || emailChecking.length)
    throw new Error(
      `${
        fullNameChecking.length ? "fullname" : "email"
      } you provided already exists!`
    );
  let user = await usersModel.create({
    fullName,
    email,
    password,
    role,
    active,
  });
  response(res, user);
});
const login = errorHandler(async (req, res, next) => {
  let { email, password } = req.body;
  let userChecking = await usersModel
    .findOne({ email })
    .select("fullname email password role");
  if (!userChecking) throw new Error("You haven't signed in yet!");
  let checking = await bcrypt.compare(password, userChecking.password);
  if (!checking) throw new Error("Password you entered is incorrect!");

  let token = jwt.sign(
    { id: userChecking.id, role: userChecking.role },
    process.env.JWT_REFRESH_TOKEN_KEY,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_KEY }
  );

  let options = {
    maxAge: process.env.JWT_ACCESS_TOKEN_KEY,
    httpOnly: false,
  };
  res.cookie("jwt", token, options);

  let obj = userChecking.toObject();
  delete password;
  delete role;
  response(res, obj + "Successfully logged in!");
});

let logout = errorHandler(async (req, res, next) => {
  let { email, password } = req.body;
  let userChecking = await usersModel
    .findOne({ email })
    .select("fullname email password role");
  if (!userChecking) throw new Error("You haven't signed in yet!");
  let checking = await bcrypt.compare(password, userChecking.password);
  if (!checking) throw new Error("Password you entered is incorrect!");
  userChecking.password = password;

  let options = {
    maxAge: process.env.JWT_ACCESS_TOKEN_KEY,
    httpOnly: false,
  };
  res.clearCookie("jwt", options);
  response(res, "You successfully logget out!");
});

module.exports = { login, register, logout };
