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
  country: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  provinceState: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  cityTown: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  addressLine: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING(250),
  },
  isMain: {
    type: DataTypes.TINYINT,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

//Sets configurations the from model or table
const config = {
  tableName: "usersLocations",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: false,
};

//------------------------- Asignation
const UserLocation = sequelize.define(alias, cols, config);

//------------------------- Relationship
UserLocation.associations = function (models) {
  UserLocation.belongsTo(models.User, {
    as: "users",
    foreignKey: "userId",
  });
};

//------------------------- Init Model
const initModel = function () {
  return UserLocation;
};

//------------------------- Return
module.exports = initModel;
