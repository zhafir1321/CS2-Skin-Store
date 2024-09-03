const { Item } = require('../models/index');

class ItemController {
  static async postItem(req, res, next) {
    try {
      const { skin, weapon, exterior, price } = req.body;
      const item = await Item.create({ skin, weapon, exterior, price });

      res.status(201).json({
        data: item,
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal Server Error';
      if (error.name === 'SequelizeValidationError') {
        statusCode = 404;
        message = error.errors.map((el) => el.message).join(', ');
      }
      if (error.message === 'SKIN_NOT_FOUND') {
        statusCode = 404;
        message = 'Invalid Skin Weapon';
      }
      res.status(statusCode).json({
        message,
      });
    }
  }
}

module.exports = ItemController;
