const express = require("express");
const router = express.Router();
const {
  schemaUser,
  schemaSubscription,
  schemaVerify,
} = require("./../../middlewares/validation/schema");
const ctrl = require("../../controller/users");
const validateReqBody = require("./../../middlewares/validation/validation");
const asyncWrapper = require("../../helpers/asyncWrapper");
const auth = require("./../../middlewares/auth");
const upload = require("./../../middlewares/upload");

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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  asyncWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", asyncWrapper(ctrl.verify));

router.post(
  "/verify",
  validateReqBody(schemaVerify),
  asyncWrapper(ctrl.reVerify)
);

module.exports = router;
