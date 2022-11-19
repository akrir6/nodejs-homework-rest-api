const Contact = require("./schema");

const getAllContacts = async (owner, skip, limit, favorite) => {
  if (favorite) {
    return await Contact.find({ owner, favorite }).skip(skip).limit(limit);
  }
  return await Contact.find({ owner }).skip(skip).limit(limit);
};

const getContactById = async (_id, owner) => {
  return await Contact.find({ _id, owner });
};

const createContact = async (fields) => {
  return await Contact.create(fields);
};

const removeContactById = async (_id, owner) => {
  return await Contact.findOneAndRemove({ _id, owner });
};

const updateContactById = async (_id, fields, owner) => {
  return await Contact.findOneAndUpdate({ _id, owner }, fields, {
    returnDocument: "after",
  });
};

const updateStatusById = async (_id, { favorite }, owner) => {
  return await Contact.findOneAndUpdate(
    { _id, owner },
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
