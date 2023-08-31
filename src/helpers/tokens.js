require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const oBlackList = [];

const generateToken = (id, type) => {
  const data = {
    id: id.toString(),
    type: type,
  };

  return jwt.sign(data, TOKEN_SECRET, { expiresIn: "20m" });
};

module.exports = {
  TOKEN_SECRET,
  generateToken,
};
