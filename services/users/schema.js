const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../helpers/sendMail");

const user = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },

  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },

  token: String,
  avatarURL: String,
});

user.pre("save", async function () {
  if (this.isNew) {
    this.verificationToken = uuidv4();
    this.password = await bcrypt.hash(this.password, 10);
    this.avatarURL = gravatar.url(this.email);
    await sendMail(this.email, this.verificationToken);
  }
});
const User = model("User", user);

module.exports = User;
