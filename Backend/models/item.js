'use strict';
const { Model } = require('sequelize');
const axios = require('axios');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Transaction, { foreignKey: 'ItemId' });
    }
  }
  Item.init(
    {
      skin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Skin name is required',
          },
          notEmpty: {
            msg: 'Skin name is required',
          },
          async isValidSkin(value) {
            try {
              const { data } = await axios.get(
                'https://api.bitskins.com/market/skin/730',
              );
              const skinExist = data.some((skin) => {
                const pattern = /\|\s*(.*?)\s*\(/;
                const match = skin.name.match(pattern);
                const skinPattern = match ? match[1] : null;

                return skinPattern === value;
              });

              if (!skinExist) {
                throw new Error('Skin not found');
              }
            } catch (error) {
              throw new Error('Skin not found');
            }
          },
        },
      },
      weapon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Weapon type is required',
          },
          notEmpty: {
            msg: 'Weapon type is required',
          },
        },
      },
      exterior: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Exterior type is required',
          },
          notEmpty: {
            msg: 'Exterior type is required',
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Price is required',
          },
          notNull: {
            msg: 'Price is required',
          },
          min: {
            args: [10_000],
            msg: 'Price cannot be lower than 10.000',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Item',
      hooks: {
        async beforeCreate(item, options) {
          try {
            const itemName = `${item.weapon} | ${item.skin} (${item.exterior})`;

            const { data } = await axios.get(
              'https://api.bitskins.com/market/skin/730',
            );

            const validItem = data.some((skin) => skin.name === itemName);

            if (!validItem) {
              throw new Error(`SKIN_NOT_FOUND`);
            }
          } catch (error) {
            throw new Error(`SKIN_NOT_FOUND`);
          }
        },
      },
    },
  );
  return Item;
};
