'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      }),
      Order.belongsToMany(models.Product,{
        through: 'orders_products',
        foreignKey: 'order_id',
        onDelete: 'CASCADE'
      })
    }

  }
  Order.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};