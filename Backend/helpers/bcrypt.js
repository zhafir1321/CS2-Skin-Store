const bcrypt = require('bcryptjs');

const hash = (password) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
};

const compare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { hash, compare };
