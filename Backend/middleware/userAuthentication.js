const { User } = require('../models/index');
const { verifyToken } = require('../helpers/jwt');

const userAuthentication = async function (req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw { name: 'UNAUTHENTICATED' };

    const token = authorization.split(' ')[1];

    if (!token) throw { name: 'UNAUTHENTICATED' };

    const payload = verifyToken(token);

    const foundUser = await User.findByPk(payload.id);

    if (!foundUser) throw { name: 'UNAUTHENTICATED' };

    req.addionalData = {
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
    };
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = userAuthentication;
