const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const contacts = require("./../../models/contacts");

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
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = { id: uuidv4(), name, email, phone };
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
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const contactToUpdate = await contacts.updateContact(id, {
    name,
    email,
    phone,
  });
  if (!contactToUpdate) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ reult: contactToUpdate });
});

module.exports = router;
