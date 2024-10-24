const jwt = require("jsonwebtoken");

exports.createJwt = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY);
};

exports.verifyJwt = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
