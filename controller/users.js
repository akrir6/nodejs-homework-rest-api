const bcrypt = require("bcrypt");

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
  const user = await service.updateAvatar(req.user.id, req.body.url);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  return res.status(200).json({ user });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
};
