const fs = require("fs/promises");
const path = require("path");
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
  data.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return body;
};

const updateContact = async (contactId, body) => {
  const data = await getContactById(contactId);
  if (!data) return null;
  if (body.name) data.name = body.name;
  if (body.phone) data.phone = body.phone;
  if (body.email) data.email = body.email;

  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
