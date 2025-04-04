const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.model");
const { response } = require("../utils/response");
require("dotenv").config();

const protect = async function (req, res, next) {
  try {
    let tokenComing = req.headers.authorizarion;
    if (!tokenComing || !tokenComing.startsWith("Bearer"))
      throw new Error("Token is invalid!");
    let actualToken = req.headers.authorizarion.split(" ")[1];
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
