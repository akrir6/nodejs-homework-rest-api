const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const {
  schemaPutContact,
  schemaPostContact,
} = require("./../../validation/schema");
const contacts = require("./../../models/contacts");
const validateReqBody = require("./../../validation/validation");

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

router.post("/", validateReqBody(schemaPostContact), async (req, res, next) => {
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

router.put(
  "/:contactId",
  validateReqBody(schemaPutContact),
  async (req, res, next) => {
    const { contactId } = req.params;
    const contactToUpdate = await contacts.updateContact(contactId, req.body);
    if (!contactToUpdate) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ result: contactToUpdate });
  }
);

module.exports = router;
