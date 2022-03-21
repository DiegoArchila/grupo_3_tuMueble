//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

//------------------------- Settings

//Set the Alias
const alias = "UserPhone";

//Sets the columns
const cols = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING(250),
  },
};

//Sets configurations the from model or table
const config = {
  tableName: "phonesCategory",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: false,
};

//------------------------- Asignation
const PhoneCategory = sequelize.define(alias, cols, config);

//------------------------- Relationship

//------------------------- Init Model
const initModel = function () {
  return PhoneCategory;
};

//------------------------- Return
module.exports = initModel;
