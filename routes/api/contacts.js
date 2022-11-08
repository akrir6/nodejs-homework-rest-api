const express = require("express");
const router = express.Router();
const {
  schemaPutContact,
  schemaPostContact,
  schemaPatchStatus,
} = require("./../../middlewares/validation/schema");
const ctrl = require("../../controller/contacts");
const validateReqBody = require("./../../middlewares/validation/validation");
const asyncWrapper = require("./../../middlewares/asyncWrapper");

router.get("/", asyncWrapper(ctrl.get));

router.get("/:contactId", asyncWrapper(ctrl.getById));

router.post("/", validateReqBody(schemaPostContact), asyncWrapper(ctrl.create));

router.delete("/:contactId", asyncWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validateReqBody(schemaPutContact),
  asyncWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateReqBody(schemaPatchStatus),
  asyncWrapper(ctrl.updateStatusById)
);

module.exports = router;
