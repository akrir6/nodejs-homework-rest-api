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

const logout = async (fields) => {};
const getCurrent = async (fields) => {};

const updateSubscription = async (id, { subscription }) => {};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};
