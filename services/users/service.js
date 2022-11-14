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
  getUserById,
  getUserByEmail,
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};
