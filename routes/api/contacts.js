const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const contacts = require("./../../models/contacts");

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  res.status(200);
  res.json({ data });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const data = await contacts.getContactById(id);
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ data });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const data = { id: uuidv4(), name, email, phone };
  await contacts.addContact(data);
  res.status(201).json({ data });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const data = await contacts.removeContact(id);
  if (!data) {
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
  const data = await contacts.updateContact(id, { name, email, phone });
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ data });
});

module.exports = router;
