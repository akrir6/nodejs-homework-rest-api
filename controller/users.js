const Jimp = require("jimp");
const path = require("path");
const bcrypt = require("bcrypt");
const sendMail = require("../helpers/sendMail");
const service = require("../services/users/service");

const register = async (req, res, next) => {
  if (await service.getUserByEmail(req.body.email)) {
    return res.status(409).json({ message: "Email in use" });
  }
  const user = await service.register(req.body);
  res.status(201).json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(401).json({ message: "Not verified" });
  }

  const loginedUser = await service.login(user.id);
  return res.status(200).json({
    user: loginedUser,
  });
};

const logout = async (req, res, next) => {
  const logoutedUser = await service.logout(req.user.id);
  if (!logoutedUser) {
    return res.status(401).json({ message: "Not authorized" });
  }
  return res.status(204).json();
};

const getCurrent = async (req, res, next) => {
  const user = await service.getCurrent(req.user.token);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  return res.status(200).json({ user });
};

const updateSubscription = async (req, res, next) => {
  const user = await service.updateSubscription(
    req.user.id,
    req.body.subscription
  );
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  return res.status(200).json({ user });
};

const updateAvatar = async (req, res, next) => {
  const url = path.join(
    __dirname,
    "../public/avatars",
    req.user.id + path.extname(req.file.filename)
  );

  const img = await Jimp.read(req.file.path);
  await img.resize(250, 250).write(url);

  const { avatarURL } = await service.updateAvatar(req.user.id, url);
  return res.status(200).json({ avatarURL });
};

const verify = async (req, res, next) => {
  const user = await service.verify(req.params.verificationToken);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Verification successful" });
};

const reVerify = async (req, res, next) => {
  const user = await service.getUserByEmail(req.body.email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }
  await sendMail(user.email, user.verificationToken);
  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verify,
  reVerify,
};
