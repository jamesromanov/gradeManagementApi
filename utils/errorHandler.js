const { response } = require("./response");
const errorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      response(res, err.message, 500);
    });
  };
};
module.exports = errorHandler;
