const { response } = require("../utils/response");

const checkRole = function (role) {
  return function (req, res, next) {
    try {
      if (!role.includes(req.user.role))
        throw new Error("You don't have rights to do that!");
      else next();
    } catch (error) {
      response(res, error.message, 403);
    }
  };
};

module.exports = checkRole;
