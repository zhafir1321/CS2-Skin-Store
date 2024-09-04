const { Item } = require('../models/index');
const cloudinary = require('../utils/cloudinary');

class ItemController {
  static async postItem(req, res, next) {
    try {
      const { skin, weapon, exterior, price } = req.body;

      const file = req.file;

      if (!file) throw { name: 'IMG_NOT_FOUND' };

      const base64 = file.buffer.toString('base64');

      const output = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${base64}`,
      );

      const item = await Item.create({
        skin,
        weapon,
        exterior,
        price,
        imgUrl: output.secure_url,
      });

      res.status(201).json({
        data: item,
      });
    } catch (error) {
      console.log(error);

      let statusCode = 500;
      let message = 'Internal Server Error';
      if (error.name === 'SequelizeValidationError') {
        statusCode = 404;
        message = error.errors.map((el) => el.message).join(', ');
      }
      if (error.name === 'IMG_NOT_FOUND') {
        statusCode = 404;
        message = 'Image is required';
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

  static async getItems(req, res, next) {
    try {
      const items = await Item.findAll();

      res.status(200).json({
        data: items,
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal Server Error';
      res.status(statusCode).json({
        message,
      });
    }
  }

  static async getItemsById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);

      if (!item) throw { name: 'ITEM_NOT_FOUND' };

      res.status(200).json({
        data: item,
      });
    } catch (error) {
      let statusCode = 500;
      let message = 'Internal Server Error';
      if (error.name === 'ITEM_NOT_FOUND') {
        statusCode = 404;
        message = 'Data not found';
      }
      res.status(statusCode).json({
        message,
      });
    }
  }
}

module.exports = ItemController;
