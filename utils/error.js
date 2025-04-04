const { response } = require("../utils/response");

const err = (err, req, res, next) => {
  response(res, "Middeware Error:" + err.message, 500);
};

module.exports = err;
