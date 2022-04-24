//------------------------- Imports
const { DataTypes } = require("sequelize");

//------------------------- Init Model
const initModel = function (sequelize) {
  //------------------------- Settings

  //Set the Alias
  const alias = "EmailCategory";

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
      unique: true,
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "emailsCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const EmailCategory = sequelize.define(alias, cols, config);

  //------------------------- Relationship

  return EmailCategory;
};

//------------------------- Return
module.exports = initModel;
