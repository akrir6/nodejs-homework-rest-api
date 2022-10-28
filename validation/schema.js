const Joi = require("joi");

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

module.exports = schema;
