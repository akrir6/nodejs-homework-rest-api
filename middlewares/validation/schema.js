const Joi = require("joi");

const defaultParams = {
  name: Joi.string()
    .min(3)
    .pattern(/^[A-Za-z\s.\-']*$/),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { deny: ["ru"] } }),
  phone: Joi.string().pattern(
    /^(?:\d{3}|\(\d{3}\))\s\d{3}([-\s])\d{2}\1\d{2}$/
  ),
  favorite: Joi.boolean(),
  subscription: Joi.string().valid("starter", "pro", "business"),
};

const schemaPostContact = Joi.object({
  name: defaultParams.name.required(),
  email: defaultParams.email.required(),
  phone: defaultParams.phone.required(),
  favorite: defaultParams.favorite,
  owner: Joi.string(),
});

const schemaPutContact = Joi.object({
  name: defaultParams.name,
  email: defaultParams.email,
  phone: defaultParams.phone,
  favorite: defaultParams.favorite,
}).or("name", "email", "phone");

const schemaPatchStatus = Joi.object({
  name: defaultParams.name,
  email: defaultParams.email,
  phone: defaultParams.phone,
  favorite: defaultParams.favorite.required(),
});

const schemaUser = Joi.object({
  email: defaultParams.email.required(),
  password: Joi.string().required(),
  subscription: defaultParams.subscription,
});

const schemaSubscription = Joi.object({
  subscription: defaultParams.subscription.required(),
});

module.exports = {
  schemaPostContact,
  schemaPutContact,
  schemaPatchStatus,
  schemaUser,
  schemaSubscription,
};
