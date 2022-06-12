'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {

    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    text: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};