const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/users/service");

const auth = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization?.split(" ");
    if (tokenType !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(id);
    if (!user || !user.token || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = auth;
