const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const {
  emailRegExp,
  userNameRegExp,
  transactionCategories,
} = require("../constants");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, " is required"],
    },
    token: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, " is required"],
      unique: true,
    },
    userName: {
      type: String,
      match: userNameRegExp,
      required: [true, " is required"],
    },
    avatarURL: {
      type: String,
      default: "public\\no-picture.svg",
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactionCategories: {
      type: Array,
      default: transactionCategories,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
  try {
    this.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.setAvatarURL = async function (email) {
  try {
    this.avatarURL = await gravatar.url(email, {
      protocol: "http",
      s: "250",
      d: "retro",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
