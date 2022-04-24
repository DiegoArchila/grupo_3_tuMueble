//------------------------- Imports
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize({ dialect: "mysql" });

//------------------------- Init Model
const initModel = function () {

 //------------------------- Settings

  //Set the Alias
  const alias = "User";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    dateBorn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pwd: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const User = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  User.associate=(models)=>{

    /**
     * Email has many emails from user
     */
    User.hasMany(models.UserEmail,{
      as:"userEmails",
      foreignKey:"Id"
    });
  }
   return User;
};

//------------------------- Return
module.exports = initModel;
