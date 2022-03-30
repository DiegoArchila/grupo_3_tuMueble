//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");

//------------------------- Settings
const EmailCategory = (sequelize) => {
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
    tableName: "emailsCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship

//------------------------- Return
module.exports = EmailCategory;
