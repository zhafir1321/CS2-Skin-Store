const jwt = require('jsonwebtoken');
const secretKey = 'rahasia';

const signToken = (payload) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: '1h',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { signToken, verifyToken };
