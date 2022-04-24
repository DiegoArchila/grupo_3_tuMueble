//------------------------- Imports
const { DataTypes } = require("sequelize");

//------------------------- Init Model
const initModel = function (sequelize) {
  //------------------------- Settings

  //Set the Alias
  const alias = "UserLocation";

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
    ProvinceState: {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
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

  return UserLocation;
};

//------------------------- Return
module.exports = initModel;
