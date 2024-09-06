const { User } = require("../models/index");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "1063703834030-a0366tcgulbl957b98cooakiirbrts3l.apps.googleusercontent.com",
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          username: payload.email,
        },
        defaults: {
          email: payload.email,
          username: payload.email,
          fullName: payload.name,
          password: "password_google",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        username: user.username,
      });
      console.log(access_token);

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
    }
  }

  static async postRegister(req, res, next) {
    try {
      const { fullName, username, password, email } = req.body;
      const user = await User.create({ fullName, username, password, email });

      res.status(201).json({
        message: "Register Successful",
      });
    } catch (error) {
      console.log(error);

      let statusCode = 500;
      let message = "Internal Server Error";
      if (error.name === "SequelizeValidationError") {
        statusCode = 400;
        message = error.errors.map((el) => el.message).join(", ");
      }
      res.status(statusCode).json({
        message,
      });
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) throw { name: "UserPasReq" };
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) throw { name: "INVALID_LOGIN" };

      if (!compare(password, user.password)) throw { name: "INVALID_LOGIN" };

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
      let message = "Internal Server Error";
      if (error.name === "INVALID_LOGIN") {
        statusCode = 401;
        message = "Invalid Username/ Password";
      }
      if (error.name === "UserPasReq") {
        statusCode = 401;
        message = "Invalid Username/ Password";
      }

      res.status(statusCode).json({
        statusCode,
        message,
      });
    }
  }
}

module.exports = AuthController;
