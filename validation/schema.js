const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[A-Za-z\s.\-']*$/),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { deny: ["ru"] } }),
  phone: Joi.string().pattern(
    /^(?:\d{3}|\(\d{3}\))\s\d{3}([-\s])\d{2}\1\d{2}$/
  ),
});

const schemaPostContact = schema.append({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
});

const schemaPutContact = schema.or("name", "email", "phone");

module.exports = {
  schemaPostContact,
  schemaPutContact,
};
