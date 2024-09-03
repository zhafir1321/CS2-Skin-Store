'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'BuyerId' });
      Transaction.belongsTo(models.Item, { foreignKey: 'ItemId' });
    }
  }
  Transaction.init(
    {
      transactionTime: DataTypes.DATE,
      ItemId: DataTypes.INTEGER,
      BuyerId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Not Paid',
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    },
  );
  return Transaction;
};
