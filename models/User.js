const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { emailRegExp } = require('../constants/');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
      default: 'public\\no-picture.svg',
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
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
      protocol: 'http',
      s: '250',
      d: 'retro',
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
