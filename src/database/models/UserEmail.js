//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");

//------------------------- Settings
const UserEmail = (sequelize) => {
  //Set the Alias
  const alias = "UserEmail";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersEmails",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship
UserEmail.associations = function (models) {
  UserEmail.belongsTo(models.EmailCategory, {
    as: "emailsCategory",
    foreignKey: "categoryId",
  });

  UserEmail.belongsTo(models.User, {
    as: "users",
    foreignKey: "userId",
  });
};

//------------------------- Return
module.exports = UserEmail;
