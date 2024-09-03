const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { hash, compare };
