const contacts = require("./../models/contacts");

const get = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json({ result });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ result });
};

const create = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json({ result });
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await contacts.removeContact(contactId);
  if (!contactToRemove) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToUpdate = await contacts.updateContact(contactId, req.body);
  if (!contactToUpdate) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ result: contactToUpdate });
};

const updateStatusById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToUpdate = await contacts.updateContact(contactId, req.body);
  if (!contactToUpdate) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ result: contactToUpdate });
};

module.exports = {
  get,
  getById,
  create,
  removeById,
  updateById,
  updateStatusById,
};
