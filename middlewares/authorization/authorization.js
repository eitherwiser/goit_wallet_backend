const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../../models/");

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Unauthorized("Not authorized");
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    //const { _id } = req.user;
    //console.log(req.user);
    //console.log(_id);
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.mesage = "Not authorized";
    }
    next();
  }
};

module.exports = authenticate;
