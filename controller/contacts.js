const service = require("../services/contacts/service");

const get = async (req, res, next) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await service.getAllContacts(
    req.user.id,
    skip,
    Number(limit),
    Boolean(favorite)
  );
  res.status(200).json({ result });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.getContactById(contactId, req.user.id);
  if (!result) {
    return res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
  }
  res.status(200).json({ result });
};

const create = async (req, res, next) => {
  const result = await service.createContact({
    owner: req.user.id,
    favorite: false,
    ...req.body,
  });
  res.status(201).json({ result });
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await service.removeContactById(
    contactId,
    req.user.id
  );
  if (!contactToRemove) {
    return res
      .status(404)
      .json({ message: `Not found contact  with id '${contactId}'` });
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToUpdate = await service.updateContactById(
    contactId,
    req.body,
    req.user.id
  );
  if (!contactToUpdate) {
    return res
      .status(404)
      .json({ message: `Not found contact  with id '${contactId}'` });
  }
  res.status(200).json({ result: contactToUpdate });
};

const updateStatusById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToUpdate = await service.updateStatusById(
    contactId,
    req.body,
    req.user.id
  );
  if (!contactToUpdate) {
    return res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
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
