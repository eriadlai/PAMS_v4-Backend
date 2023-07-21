require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const adminAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send();
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    if (!data) {
      res.status(401).send();
      return;
    }

    const isAdmin = data.type === "ADMINISTRADOR" ? true : false;
    if (err || !isAdmin) {
      res.status(403).send();
    } else {
      res.locals.user = data;
      next();
    }
  });
};

module.exports = {
  adminAuth,
};
