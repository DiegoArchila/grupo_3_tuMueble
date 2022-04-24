//------------------------- Imports
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize({ dialect: "mysql" });

//------------------------- Settings
//Set the Alias
const alias = "CartBox";

//Sets the columns
const cols = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

//Sets configurations the from model or table
const config = {
  tableName: "cartBox",
  timestamps: true,
  createdAt: "created_ad",
  updatedAt: "updated_ad",
  deletedAt: false,
};

//------------------------- Asignation
const CartBoxt = sequelize.define(alias, cols, config);

//------------------------- Relationship
// CartBoxt.associate = function (models) {
//     CartBoxt.belongsTo(models)
// }

//------------------------- Return
const initModel = function () {
  return CartBoxt;
};

//------------------------- Init Model
module.exports = initModel;
