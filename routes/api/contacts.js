const express = require("express");
const router = express.Router();
const {
  schemaPutContact,
  schemaPostContact,
  schemaPatchStatus,
} = require("./../../middlewares/validation/schema");
const ctrl = require("./../../controller/controller");
const validateReqBody = require("./../../middlewares/validation/validation");

router.get("/", ctrl.get);

router.get("/:contactId", ctrl.getById);

router.post("/", validateReqBody(schemaPostContact), ctrl.create);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", validateReqBody(schemaPutContact), ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  validateReqBody(schemaPatchStatus),
  ctrl.updateStatusById
);

module.exports = router;
