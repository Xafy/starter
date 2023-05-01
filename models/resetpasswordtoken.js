'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResetPasswordToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResetPasswordToken.init({
    email: DataTypes.STRING,
    token_value: DataTypes.STRING,
    used: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    inserted_at: DataTypes.DATE,
    expired_at: {
      type: DataTypes.DATE, 
      defaultValue: Date.now()
    } 

  }, {
    sequelize,
    modelName: 'ResetPasswordToken',
  });
  return ResetPasswordToken;
};