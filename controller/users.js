const service = require("../services/users/service");

const register = async (req, res, next) => {
  if (await service.getUser(req.body)) {
    return res.status(409).json({ message: "Email in use" });
  }
  const user = await service.register(req.body);
  res.status(201).json({ user });
};

module.exports = {
  register,
};
