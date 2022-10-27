const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const contacts = require("./../../models/contacts");
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

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json({ result });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ result });
});

router.post("/", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const newContact = { id: uuidv4(), ...req.body };
  await contacts.addContact(newContact);
  res.status(201).json({ result: newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await contacts.removeContact(contactId);
  if (!contactToRemove) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const contactToUpdate = await contacts.updateContact(contactId, req.body);
  if (!contactToUpdate) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ result: contactToUpdate });
});

module.exports = router;
