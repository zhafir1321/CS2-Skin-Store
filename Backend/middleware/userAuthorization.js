const { Item } = require('../models/index');

const adminAuthorization = async function (req, res, next) {
  try {
    const { role } = req.additionalData;
    if (role !== 'Admin') throw { name: 'FORBIDDEN' };

    next();
  } catch (error) {
    let statusCode = 500;
    let message = 'Internal Server Error';
    if (error.name === 'FORBIDDEN') {
      statusCode = 403;
      message = "You can't access this page";
    }
    res.status(statusCode).json({
      message,
    });
  }
};

module.exports = adminAuthorization;
