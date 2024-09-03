const jwt = require('jsonwebtoken');
const secretKey = 'rahasia';

const signToken = (payload) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: '1h',
  });
};

module.exports = { signToken };
