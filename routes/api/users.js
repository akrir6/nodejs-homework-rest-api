const express = require("express");
const router = express.Router();
const {
  schemaUser,
  schemaSubscription,
} = require("./../../middlewares/validation/schema");
const ctrl = require("../../controller/users");
const validateReqBody = require("./../../middlewares/validation/validation");
const asyncWrapper = require("./../../middlewares/asyncWrapper");
const auth = require("./../../middlewares/auth");

router.post(
  "/register",
  validateReqBody(schemaUser),
  asyncWrapper(ctrl.register)
);

router.get("/login", validateReqBody(schemaUser), asyncWrapper(ctrl.login));

router.post("/logout", auth, asyncWrapper(ctrl.logout));

router.get("/current", auth, asyncWrapper(ctrl.getCurrent));

router.patch(
  "/subscription",
  auth,
  validateReqBody(schemaSubscription),
  asyncWrapper(ctrl.updateSubscription)
);

module.exports = router;
