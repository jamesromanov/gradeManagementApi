const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.model");
const { response } = require("../utils/response");
require("dotenv").config();

const protect = async function (req, res, next) {
  try {
    let tokenComing = req.headers.authorization;
    if (!tokenComing || !tokenComing.startsWith("Bearer"))
      throw new Error("Token is invalid!");
    let actualToken = req.headers.authorization.split(" ")[1];
    if (!req.cookies.jwt || req.cookies.jwt !== actualToken)
      throw new Error("Token is invalid or something went wrong!");

    let checkignToken = jwt.verify(
      actualToken,
      process.env.JWT_ACCESS_TOKEN_KEY
    );
    let user = await usersModel
      .findById(checkignToken.id)
      .select("role email active");
    if (!user || !user.active)
      throw new Error("Information about provided user is not found!");
    req.user = user;
    next();
  } catch (error) {
    response(res, error.message, 403);
  }
};

module.exports = protect;
