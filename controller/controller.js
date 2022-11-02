const service = require("../services/service");

const get = async (req, res, next) => {
  const result = await service.getAllContacts();
  res.status(200).json({ result });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.getContactById(contactId);
  if (!result) {
    return res
      .status(404)
      .json({ message: `Not found contact  with id '${contactId}'` });
  }
  res.status(200).json({ result });
};

const create = async (req, res, next) => {
  const result = await service.createContact({ favorite: false, ...req.body });
  res.status(201).json({ result });
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await service.removeContactById(contactId);
  if (!contactToRemove) {
    return res
      .status(404)
      .json({ message: `Not found contact  with id '${contactId}'` });
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToUpdate = await service.updateContactById(contactId, req.body);
  if (!contactToUpdate) {
    return res
      .status(404)
      .json({ message: `Not found contact  with id '${contactId}'` });
  }
  res.status(200).json({ result: contactToUpdate });
};

const updateStatusById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToUpdate = await service.updateStatusById(contactId, req.body);
  if (!contactToUpdate) {
    return res
      .status(404)
      .json({ message: `Not found contact  with id '${contactId}'` });
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
