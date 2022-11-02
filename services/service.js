const Contact = require("./schema");

const getAllContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const createContact = async (fields) => {
  return await Contact.create(fields);
};

const removeContactById = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

const updateContactById = async (id, fields) => {
  return await Contact.findByIdAndUpdate(id, fields, {
    returnDocument: "after",
  });
};

const updateStatusById = async (id, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { returnDocument: "after" }
  );
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
  updateStatusById,
};
