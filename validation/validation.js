const schema = require("./schema");
const REQ_METHODS = ["POST", "PUT"];

const validation = (req, res, next) => {
  if (!REQ_METHODS.includes(req.method)) return next();

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  return next();
};

module.exports = validation;
