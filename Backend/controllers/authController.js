const { User } = require('../models/index');
const { compare } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class AuthController {
  static async postRegister(req, res, next) {
    try {
      const { fullName, username, password, email } = req.body;
      const user = await User.create({ fullName, username, password, email });

      res.status(201).json({
        message: 'Register Successful',
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal Server Error';
      if (error.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = error.errors.map((el) => el.message).join(', ');
      }
      res.status(statusCode).json({
        message,
      });
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) throw { name: 'INVALID_LOGIN' };

      if (!compare(password, user.password)) throw { name: 'INVALID_LOGIN' };

      const payload = {
        id: user.id,
        role: user.role,
      };

      const accessToken = signToken(payload);

      res.status(200).json({
        access_token: accessToken,
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal Server Error';
      if (error.name === 'INVALID_LOGIN') {
        statusCode = 401;
        message = 'Invalid Username/ Password';
      }

      res.status(statusCode).json({
        statusCode,
        message,
      });
    }
  }
}

module.exports = AuthController;
