const User = require("./schema");

const getUser = async ({ email }) => {
  return await User.findOne({ email });
};

const register = async (fields) => {
  const { email, subscription } = await User.create(fields);
  return { email, subscription };
};

const login = async (fields) => {
  return await User.create(fields);
};
const logout = async (fields) => {
  return await User.create(fields);
};
const getCurrent = async (fields) => {
  return await User.create(fields);
};

const updateSubscription = async (id, { subscription }) => {
  return await User.findByIdAndUpdate(
    id,
    { subscription },
    { returnDocument: "after" }
  );
};

module.exports = {
  getUser,
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};
