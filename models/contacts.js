// const fs = require('fs/promises')

const listContacts = async () => {
  return "FFFFF";
};

const getContactById = async (contactId) => {
  return contactId;
};

const removeContact = async (contactId) => {
  return contactId;
};

const addContact = async (body) => {
  return body;
};

const updateContact = async (contactId, body) => {
  return { contactId, ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
