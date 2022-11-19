const jwt = require("jsonwebtoken");
const User = require("./schema");

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const register = async (fields) => {
  const { email, subscription } = await User.create(fields);
  return { email, subscription };
};

const login = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  return await User.findByIdAndUpdate(
    id,
    { token },
    { returnDocument: "after" }
  ).select("-_id email subscription token");
};

const logout = async (id) => {
  return await User.findByIdAndUpdate(id, { token: null });
};

const getCurrent = async (token) => {
  const { email, subscription } = await User.findOne({ token });
  return { email, subscription };
};

const updateSubscription = async (id, newSubscription) => {
  const { email, subscription } = await User.findByIdAndUpdate(
    id,
    { subscription: newSubscription },
    { returnDocument: "after" }
  );
  return { email, subscription };
};

module.exports = {
  getUserById,
  getUserByEmail,
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};
