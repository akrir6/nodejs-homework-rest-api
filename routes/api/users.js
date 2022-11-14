const express = require("express");
const router = express.Router();
const { schemaUser } = require("./../../middlewares/validation/schema");
const ctrl = require("../../controller/users");
const validateReqBody = require("./../../middlewares/validation/validation");
const asyncWrapper = require("./../../middlewares/asyncWrapper");

router.post(
  "/register",
  validateReqBody(schemaUser),
  asyncWrapper(ctrl.register)
);

router.get("/login", validateReqBody(schemaUser), asyncWrapper(ctrl.login));

router.post("/logout", asyncWrapper(ctrl.logout));

router.get("/current", asyncWrapper(ctrl.getCurrent));

router.patch(
  "/subscription",
  validateReqBody(schemaUser),
  asyncWrapper(ctrl.updateSubscription)
);

module.exports = router;
