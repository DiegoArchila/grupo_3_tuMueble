//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({dialect:"mysql"});

//------------------------- Settings
const initModel = (sequelize) => {
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
      unique: true,
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: DataTypes.DATE,
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

