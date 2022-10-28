const Joi = require("joi");
const REQ_METHODS = ["POST", "PUT"];

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[A-Za-z\s.\-']*$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ["ru"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^(?:\d{3}|\(\d{3}\))\s\d{3}([-\s])\d{2}\1\d{2}$/)
    .required(),
});

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
