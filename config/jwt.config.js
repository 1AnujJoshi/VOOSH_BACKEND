const jwt = require("jsonwebtoken");

const generateToken = async (payload, secret, options) => {
  const token = await jwt.sign(payload, secret, options);

  return token;
};

const checkToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } else {
    const error = new Error("Invalid Token!");
    error.name = "JsonWebTokenError";
    throw error;
  }
};

module.exports = {
  generateToken,
  checkToken,
};
