const Contact = require("./../db/schema");

const getAllContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById({ _id: id });
};

const createContact = async (body) => {
  return await Contact.create({ ...body });
};

const removeContactById = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

const updateContactById = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, { $set: { ...body } });
};

const updateStatusById = async (id, { favorite }) => {
  return await Contact.findByIdAndUpdate(id, { $set: { favorite } });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
  updateStatusById,
};
