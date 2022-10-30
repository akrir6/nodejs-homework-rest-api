const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const searchedContact = data.find((c) => c.id === contactId);
  if (!searchedContact) return null;
  return searchedContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((c) => c.id === contactId);
  if (index === -1) return null;
  const [contactToRemove] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return contactToRemove;
};

const addContact = async (body) => {
  const data = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((c) => c.id === contactId);
  if (index === -1) return null;
  const contactToUpdate = { ...data[index], ...body };
  data[index] = contactToUpdate;
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
